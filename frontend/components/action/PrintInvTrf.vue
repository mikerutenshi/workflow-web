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
import { useDate } from 'vuetify';
import type { InvTrfModel } from '~/models/inv-trf.model';

const props = defineProps({
  color: { type: String, default: 'primary' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  invTrfModel: {
    type: Object as PropType<InvTrfModel>,
    required: true,
  },
});

const { t } = useI18n();
const adapter = useDate();

function handleClick() {
  // console.log('InvTrfModel: ' + JSON.stringify(invTrfModel));
  createPdf(props.invTrfModel);
}

function createPdf(invTrfModel: InvTrfModel) {
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
  const title = 'Inventory Transfer Slip';
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
  const tBody = props.invTrfModel.invTrfItems.map((item) => {
    let sum = item.invTrfItemSizes.reduce(
      (sum, size) => sum + size.quantity,
      0,
    );
    totalQty = totalQty + sum;
    let price = item.product.productGroup.msrp;
    let disc = item.discount ? parseFloat(item.discount) : 0;
    let subTotal = price ? price * (1 - disc) * sum : 0;
    totalPrice = totalPrice + subTotal;
    return [
      item.product.sku || '',
      formatRupiah(price) || '',
      item.discount
        ? formatDiscount(convertDecimalToPercent(item.discount))
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
    ],
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [84, 123, 138] },
    footStyles: { fillColor: [84, 123, 138] },
    didDrawPage: (d) => {
      lastTableY = Math.round(d.cursor?.y || 120);
    },
  });

  doc.setFont(pageFont, 'normal');
  doc.text(`${t('label.sender_sign')}:`, pageMargin, lastTableY + margin * 1.5);
  doc.text(
    `${t('label.receiver_sign')}:`,
    pageWidth - pageMargin,
    lastTableY + margin * 1.5,
    {
      align: 'right',
    },
  );

  doc.save(`${trfNo}.pdf`);
}
</script>
