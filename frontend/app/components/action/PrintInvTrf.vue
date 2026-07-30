<template>
  <v-btn
    :color="color"
    :loading="loading"
    :disabled="loading || disabled"
    :outlined="outlined"
    :prepend-icon="mdiPrinter"
    @click="handleClick"
  >
    {{ $t('btn.print') }}
  </v-btn>
</template>

<script setup lang="ts">
import { mdiPrinter } from '@mdi/js';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import {
  GetInvTrfDocument,
  type GetInvTrfQuery,
  type InvTrf,
} from '~/api/generated/types';

const props = defineProps({
  color: { type: String, default: 'primary' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  invTrfId: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
});

const { t } = useI18n();
const adapter = useDate();

const {
  execute: fetchTransfer,
  data: dataInvTrf,
  isFetching: isFetchingInvTrf,
  error: errorInvTrf,
} = useQuery({
  variables: { id: props.invTrfId! },
  query: GetInvTrfDocument,
  tags: [CACHE_INV_TRF],
});

function handleClick() {
  if (dataInvTrf.value) createPdf(dataInvTrf.value?.getInvTrf);
}

type InvTrfType = GetInvTrfQuery['getInvTrf'];
function createPdf(invTrfModel: InvTrfType) {
  const doc = new jsPDF();
  doc.setLineHeightFactor(1.5);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageMargin = 14;
  const margin = 8;
  const titleFontSize = 20;
  const subtitleFontSize = 15;
  const contentFontSize = 12;
  const pageFont = 'times';

  const titleX = pageWidth * 0.5;
  const titleY = pageMargin;
  const title = t('label.inv_trf_slip');
  doc.setFont(pageFont, 'bold');
  doc.setFontSize(titleFontSize);
  doc.text(title, titleX, titleY, {
    align: 'center',
  });

  const originInv = invTrfModel.fromInv;
  const originX = pageMargin;
  const originY = titleY + margin;
  const origin = `Dari:\n${originInv?.name}\n${originInv?.address}\n${originInv?.city}, ${originInv?.province}`;
  doc.setFont(pageFont, 'normal');
  doc.setFontSize(contentFontSize);
  doc.text(origin, originX, originY);

  const destInv = invTrfModel.toInv;
  const destX = pageWidth - pageMargin;
  const destY = titleY + margin;
  const destination = `Kepada:\n${destInv?.name}\n${destInv?.address}\n${destInv?.city}, ${destInv?.province}`;
  doc.setFont(pageFont, 'normal');
  doc.setFontSize(contentFontSize);
  doc.text(destination, destX, destY, { align: 'right' });

  const trfNoLabel = 'No. Transfer: ';
  const trfNoLabelX = pageMargin;
  const trfNoLabelY = destY + margin * 4;
  doc.setFont(pageFont, 'normal');
  doc.setFontSize(contentFontSize);
  doc.text(trfNoLabel, trfNoLabelX, trfNoLabelY);
  const trfNo = invTrfModel.trfNo;
  const trfNoX = pageMargin + doc.getTextWidth(trfNoLabel) + margin;
  const trfNoY = destY + margin * 4;
  doc.setFont(pageFont, 'bold');
  doc.text(trfNo, trfNoX, trfNoY);

  const trfDateLabel = 'Tanggal Kirim: ';
  const trfDateLabelX = pageMargin;
  const trfDateLabelY = trfNoLabelY + margin;
  doc.setFont(pageFont, 'normal');
  doc.text(trfDateLabel, trfDateLabelX, trfDateLabelY);
  let trfDate = invTrfModel.trfDate;
  trfDate = adapter.format(trfDate, 'fullDate');
  const trfDateX = pageMargin + doc.getTextWidth(trfNoLabel) + margin;
  const trfDateY = trfNoY + margin;
  doc.setFont(pageFont, 'bold');
  doc.setFontSize(contentFontSize);
  doc.text(trfDate, trfDateX, trfDateY);

  var totalPrice = 0;
  var totalQty = 0;
  const tBody = dataInvTrf.value?.getInvTrf.invTrfItems.map((item) => {
    let sum = item.invTrfItemSizes.reduce(
      (sum, size) => sum + size.quantity,
      0,
    );
    totalQty = totalQty + sum;
    let price = item.price;
    let subTotal = price ? computeDiscounted(price, item.discounts) * sum : 0;
    totalPrice = totalPrice + subTotal;
    return [
      item.product.sku || '',
      formatRupiah(price) || '',

      item.discounts
        ? item.discounts
            .map((disc) => formatDiscount(convertDecimalToPercent(disc)))
            .join(' + ')
        : '',
      String(
        item.invTrfItemSizes.find((subitem) => subitem.size.eu === '38')
          ?.quantity || '',
      ),
      String(
        item.invTrfItemSizes.find((subitem) => subitem.size.eu === '39')
          ?.quantity || '',
      ),
      String(
        item.invTrfItemSizes.find((subitem) => subitem.size.eu === '40')
          ?.quantity || '',
      ),
      String(
        item.invTrfItemSizes.find((subitem) => subitem.size.eu === '41')
          ?.quantity || '',
      ),
      String(
        item.invTrfItemSizes.find((subitem) => subitem.size.eu === '42')
          ?.quantity || '',
      ),
      String(
        item.invTrfItemSizes.find((subitem) => subitem.size.eu === '43')
          ?.quantity || '',
      ),
      String(
        item.invTrfItemSizes.find((subitem) => subitem.size.eu === '44')
          ?.quantity || '',
      ),
      String(sum),
      price ? String(formatRupiah(subTotal)) : '',
    ];
  });

  let lastTableY = 0;
  autoTable(doc, {
    theme: 'grid',
    startY: trfDateY + margin,
    head: [
      [
        {
          content: 'Nama Barang',
          colSpan: 1,
          rowSpan: 2,
          styles: { halign: 'center', valign: 'middle' },
        },
        {
          content: 'Harga',
          colSpan: 1,
          rowSpan: 2,
          styles: { halign: 'center', valign: 'middle' },
        },
        {
          content: 'Diskon',
          colSpan: 1,
          rowSpan: 2,
          styles: { halign: 'center', valign: 'middle' },
        },
        {
          content: 'Ukuran',
          colSpan: 7,
          rowSpan: 1,
          styles: { halign: 'center' },
        },
        {
          content: 'Jumlah',
          colSpan: 1,
          rowSpan: 2,
          styles: { halign: 'center', valign: 'middle' },
        },
        {
          content: 'Subtotal',
          colSpan: 1,
          rowSpan: 2,
          styles: { halign: 'center', valign: 'middle' },
        },
      ],
      ['38', '39', '40', '41', '42', '43', '44'],
    ],
    body: tBody,
    foot: [
      [
        {
          content: 'Total',
          colSpan: 10,
          styles: { halign: 'center' },
        },
        String(totalQty),
        String(formatRupiah(totalPrice)),
      ],
      // ...(destInv.priceFormula?.profitMargins
      //   ? [
      //       [
      //         {
      //           content: `Setelah Diskon Toko ${destInv.priceFormula.profitMargins
      //             .map((disc) => formatDiscount(convertDecimalToPercent(disc)))
      //             .join(' + ')}`,
      //           colSpan: 11,
      //           styles: { halign: 'center' as const },
      //         },
      //         String(
      //           formatRupiah(
      //             computeDiscounted(
      //               totalPrice,
      //               destInv.priceFormula.profitMargins,
      //             ),
      //           ),
      //         ),
      //       ],
      //     ]
      //   : []),
    ],
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [84, 123, 138] },
    footStyles: { fillColor: [84, 123, 138] },
    didDrawPage: (d) => {
      lastTableY = Math.round(d.cursor?.y || 120);
    },
  });

  if (invTrfModel.note) {
    doc.setFont(pageFont, 'italic');
    const noteY = lastTableY + margin * 1.5;
    // Wrap long notes to fit page width
    const maxWidth = pageWidth - pageMargin * 2;
    const noteText = `${t('label.note')}: ${invTrfModel.note || ''}`;
    const noteLines = doc.splitTextToSize(noteText, maxWidth);
    doc.text(noteLines, pageMargin, noteY);

    doc.setFont(pageFont, 'normal');
    doc.text(
      `${t('label.sender_sign')}:`,
      pageMargin,
      noteY + noteLines.length * margin * 1.2,
    );
    doc.text(
      `${t('label.receiver_sign')}:`,
      pageWidth - pageMargin,
      noteY + noteLines.length * margin * 1.2,
      {
        align: 'right',
      },
    );
  } else {
    doc.setFont(pageFont, 'normal');
    doc.text(
      `${t('label.sender_sign')}:`,
      pageMargin,
      lastTableY + margin * 1.5,
    );
    doc.text(
      `${t('label.receiver_sign')}:`,
      pageWidth - pageMargin,
      lastTableY + margin * 1.5,
      {
        align: 'right',
      },
    );
  }

  doc.save(`${trfNo}.pdf`);
}
</script>
