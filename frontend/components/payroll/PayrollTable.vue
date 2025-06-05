<template>
  <v-row v-if="error" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(error) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row class="flex-grow-0">
    <v-col>
      <ActionPickDate
        v-model="dates"
        @update:model-value="manageDates"
        multiple="range"
      ></ActionPickDate>
    </v-col>
  </v-row>

  <v-row class="flex-grow-0">
    <v-col>
      <v-card>
        <v-row no-gutters class="d-flex">
          <v-col
            class="d-flex flex-column align-center justify-end pa-2"
            cols="6"
          >
            <div
              class="d-flex flex-column align-start justify-space-between flex-grow-1"
            >
              <p>{{ $t('label.total_quantity') }}</p>
              <h2>
                {{ $t('label.pairs', data?.getPayroll.totalQuantity ?? 0) }}
              </h2>
            </div>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col
            class="d-flex flex-column align-center justify-end pa-2"
            cols="6"
          >
            <div
              class="d-flex flex-column align-start justify-space-between flex-grow-1"
            >
              <p>{{ $t('label.total_payable') }}</p>
              <h2>{{ formatRupiah(data?.getPayroll.totalPayable) }}</h2>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-skeleton-loader type="card@3" v-if="isFetching"></v-skeleton-loader>
      <v-expansion-panels multiple v-else>
        <v-expansion-panel
          v-for="artisan in data?.getPayroll.artisans"
          :key="artisan.id"
          class="my-4"
        >
          <v-expansion-panel-title class="d-flex flex-column align-start">
            <v-card-title>
              {{ `${artisan.firstName} ${artisan.lastName ?? ''}` }}
            </v-card-title>

            <v-card-subtitle class="w-100">
              <div class="d-flex align-end justify-space-between mb-2 mr-8">
                <span>{{ $t('label.quantity') }}</span>
                <h3 class="ml-auto">
                  {{ $t('label.pairs', artisan.quantityPerArtisan) }}
                </h3>
              </div>
              <div class="d-flex align-end justify-space-between mr-8">
                <span>{{ $t('label.payable') }}</span>
                <h3 class="ml-auto">
                  {{ formatRupiah(artisan.payablePerArtisan) }}
                </h3>
              </div>
            </v-card-subtitle>
          </v-expansion-panel-title>

          <v-expansion-panel-text>
            <v-data-table
              :items="artisan.tasks"
              :headers="headers"
              hide-default-footer
              items-per-page="-1"
            >
              <template #item.type="{ item }">
                {{ $t(renderJob(item.type)) }}
              </template>
              <template #item.doneAt="{ item }">
                {{ adapter.format(item.doneAt, 'fullDateWithWeekday') }}
              </template>
              <template #item.payablePerTask="{ item }">
                {{ formatRupiah(item.payablePerTask) }}
              </template>
              <template #item.costPerTask="{ item }">
                {{ formatRupiah(item.costPerTask) }}
              </template>
              <template #item.quantityPerTask="{ item }">
                {{ $t('label.pairs', item.quantityPerTask) }}
              </template>
            </v-data-table>
          </v-expansion-panel-text>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
  </v-row>
</template>

<style lang="sass">
.margin-top-appbar-height
  margin-top: $appbar-height
</style>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import { GetPayrollDocument } from '~/api/generated/types';
import weekday from 'dayjs/plugin/weekday';
import { mdiPrinter } from '@mdi/js';

const adapter = useDate();
const now = dayjs();
dayjs.extend(weekday);

const nextThurs =
  now.day() <= 6
    ? now.weekday(4).hour(23).minute(59).second(59)
    : now
        .add(1, 'week')
        .weekday(4)
        .hour(23)
        .minute(59)
        .second(59)
        .millisecond(999);
const lastFrid = nextThurs
  .subtract(6, 'days')
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);

const dates = ref<string[]>([]);
let currentDate = lastFrid.clone();
while (currentDate.isBefore(nextThurs)) {
  dates.value.push(currentDate.format('YYYY-MM-DD'));
  currentDate = currentDate.add(1, 'day');
}

const form = reactive({
  startDate: lastFrid.toISOString(),
  endDate: nextThurs.toISOString(),
});

const { execute, data, isFetching, error } = useQuery({
  query: GetPayrollDocument,
  cachePolicy: 'network-only',
  tags: [CACHE_PAYROLL],
  variables: computed(() => ({
    startDate: form.startDate,
    endDate: form.endDate,
  })),
});

const display = reactive({
  totalPayable: '',
  totalQuantity: '',
  artisans: [
    {
      payablePerARtisan: '',
      quantityPerARtisan: '',
      tasks: [
        {
          quantityPerTask: '',
          costPerTask: '',
          payablePerTask: '',
          work: {
            sizes: [
              {
                size: {
                  eu: '',
                  us: '',
                  uk: '',
                },
              },
            ],
          },
          product: {
            sku: '',
          },
        },
      ],
    },
  ],
});

const { t } = useI18n();
const headers = [
  { title: t('label.order_no'), key: 'work.orderNo' },
  { title: t('label.product'), key: 'work.product.sku' },
  { title: t('label.job'), key: 'type' },
  { title: t('label.done_at'), key: 'doneAt' },
  { title: t('label.quantity'), key: 'quantityPerTask' },
  { title: t('label.cost'), key: 'costPerTask' },
  { title: t('label.payable'), key: 'payablePerTask' },
];

function manageDates(newDates: string[] | string) {
  form.startDate = newDates[0];
  form.endDate = newDates[newDates.length - 1];
  execute();
}

// watch(
//   form,
//   (newForm) => {
//     console.log(`Payroll Form: ${JSON.stringify(newForm)}`);
//   },
//   { deep: true, immediate: true }
// );

import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import ic_borsa from '@/assets/images/ic_borsa.png';

const appBarSTore = useAppBarStore();

watch(
  () => appBarSTore.isPrintClicked,
  (isClicked) => {
    if (isClicked) {
      exportPdf();
      appBarSTore.isPrintClicked = false;
    }
  }
);
function exportPdf() {
  appBarSTore.isPrinting = true;
  const img = new Image();
  img.src = ic_borsa;

  img.onload = function () {
    const doc = new jsPDF();
    doc.setLineHeightFactor(1.6);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const artisans = data.value?.getPayroll.artisans;

    if (artisans) {
      artisans.forEach((artisan, index) => {
        if (index > 0) {
          doc.addPage();
        }
        const imgWidth = 20;

        console.log(`font: ${JSON.stringify(doc.getFontList())}`);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(16);
        const comp = 'PT Ansulindo Kharisma Lestari';
        const textWidth = doc.getTextWidth(comp);

        const imgX = (pageWidth - imgWidth - textWidth - 5) / 2;
        doc.addImage(img, 'PNG', imgX, margin, imgWidth, imgWidth);

        const compX = imgX + 25;
        const compY = 20;
        doc.text(comp, compX, compY);
        doc.setFontSize(12);
        doc.text('Jl. Kopo Jaya I No. 3\nBandung, 40224', compX, compY + 8);

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(24);
        const titleY = 56;
        doc.text(t('label.payslip'), pageWidth / 2, titleY, {
          align: 'center',
        });

        const name =
          artisan.firstName + (artisan.lastName ? ` ${artisan.lastName}` : '');
        const quantity = t('label.pairs', artisan.quantityPerArtisan);
        const payable = formatRupiah(artisan.payablePerArtisan);

        const tBody =
          artisan.tasks.map((task) => {
            return [
              String(task.work.orderNo),
              String(task.work.product.sku),
              String(t(renderJob(task.type))),
              String(adapter.format(task.doneAt, 'fullDateWithWeekday')),
              String(t('label.pairs', task.quantityPerTask)),
              String(formatRupiah(task.costPerTask)),
              String(formatRupiah(task.payablePerTask)),
            ];
          }) ?? [];

        const dateY = titleY + 12;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(12);
        doc.text(
          `${t('label.start_date')}: ${adapter.format(
            form.startDate,
            'fullDate'
          )} | ${t('label.end_date')}: ${adapter.format(
            form.endDate,
            'fullDate'
          )} | ${t('label.pay_date')}: ${adapter.format(now, 'fullDate')}`,
          pageWidth / 2,
          dateY,
          { align: 'center' }
        );
        const nameY = dateY + 16;
        doc.text(
          `${t('label.name')}: ${name}\n${t('label.jobs')}: ${artisan.jobs
            .map((job) => t(renderJob(job)))
            .join(', ')}`,
          margin,
          nameY
        );

        const totalY = nameY;

        doc.setFont('helvetica', 'bold');
        doc.text(quantity, pageWidth - margin, totalY, { align: 'right' });
        const qtyWidth = doc.getTextWidth(quantity);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `${t('label.total_quantity')}:`,
          pageWidth - margin - qtyWidth - 5,
          totalY,
          { align: 'right' }
        );

        doc.setFont('helvetica', 'bold');
        doc.text(payable, pageWidth - 13, totalY + 7, { align: 'right' });
        const payWidth = doc.getTextWidth(payable);
        doc.setFont('helvetica', 'normal');
        doc.text(
          `${t('label.total_payable')}:`,
          pageWidth - margin - payWidth - 5,
          totalY + 7,
          { align: 'right' }
        );

        const tableY = nameY + 16;
        let lastTableY = 0;
        autoTable(doc, {
          startY: tableY,
          head: [
            [
              t('label.order_no'),
              t('label.product'),
              t('label.job'),
              t('label.done_at'),
              t('label.quantity'),
              t('label.cost'),
              t('label.payable'),
            ],
          ],
          body: tBody,
          styles: { fontSize: 8 },
          didDrawPage: (d) => {
            lastTableY = Math.round(d.cursor?.y || 120);
          },
        });

        doc.setFont('helvetica', 'normal');
        doc.text(`${t('label.checked_by')}:`, margin, lastTableY + 16);
        doc.text(
          `${t('label.artisan_sign')}:`,
          pageWidth - margin,
          lastTableY + 16,
          {
            align: 'right',
          }
        );
      });
    }

    const pageCount = doc.internal.pages.length - 1;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - margin / 2,
        pageHeight - margin / 2,
        {
          align: 'right',
        }
      );
    }
    doc.save('summary.pdf');
    appBarSTore.isPrinting = false;
  };

  img.onerror = function () {
    console.error('Failed to load the image');
  };
}
</script>
