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

  <v-card rounded variant="flat">
    <v-row no-gutters class="d-flex">
      <v-col class="d-flex flex-column align-center justify-end">
        <div
          class="d-flex flex-column align-start justify-space-between flex-grow-1"
        >
          <p>{{ $t('label.total_quantity') }}</p>
          <h2>
            {{ $t('label.pairs', data?.getPayroll.totalQuantity ?? 0) }}
          </h2>
        </div>
      </v-col>
      <v-divider vertical thickness="3" class="mx-4"></v-divider>
      <v-col class="d-flex flex-column align-center justify-end">
        <div
          class="d-flex flex-column align-start justify-space-between flex-grow-1"
        >
          <p>{{ $t('label.total_payable') }}</p>
          <h2>{{ formatRupiah(data?.getPayroll.totalPayable) }}</h2>
        </div>
      </v-col>
    </v-row>
  </v-card>

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
          :group-by="groupBy"
        >
          <template #item.type="{ item }">
            {{ $t(renderJob(item.type)) }}
          </template>
          <template #item.doneAt="{ item }">
            {{ adapter.format(item.doneAt, 'normalDateWithWeekday') }}
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

          <template #group-header="{ item, columns, toggleGroup, isGroupOpen }">
            <tr>
              <td
                :colspan="columns.length"
                :class="item.depth === 1 ? 'pl-8' : ''"
              >
                <v-btn
                  size="small"
                  variant="text"
                  :icon="isGroupOpen(item) ? '$expand' : '$next'"
                  @click="toggleGroup(item)"
                ></v-btn>
                <span>{{
                  Object.values(JOB).includes(item.value)
                    ? $t(renderJob(item.value))
                    : item.value
                }}</span>
                <span class="text-grey" v-if="item.items[0]['columns']">
                  ({{
                    $t(
                      'label.pairs',
                      item.items.reduce(
                        (sum, item) =>
                          sum + Number(item['columns']['quantityPerTask'] || 0),
                        0,
                      ),
                    )
                  }})</span
                >
              </td>
            </tr>
          </template>

          <template #group-summary="{ item }">
            <tr v-if="item.items[0]['columns']">
              <td colspan="6">Subtotal</td>
              <td colspan="2">
                <h3>
                  {{
                    $t(
                      'label.pairs',
                      item.items.reduce(
                        (sum, item) =>
                          sum + Number(item['columns']['quantityPerTask'] || 0),
                        0,
                      ),
                    )
                  }}
                </h3>
              </td>
              <td>
                <h3>
                  {{
                    formatRupiah(
                      item.items.reduce(
                        (sum, item) =>
                          sum + Number(item['columns']['payablePerTask'] || 0),
                        0,
                      ),
                    )
                  }}
                </h3>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<style lang="sass">
.margin-top-appbar-height
  margin-top: $appbar-height
</style>

<script setup lang="ts">
import dayjs from 'dayjs';
import { useQuery } from 'villus';
import { useDate, useTheme } from 'vuetify';
import { GetPayrollDocument } from '~/api/generated/types';
import weekday from 'dayjs/plugin/weekday';

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

const { t } = useI18n();
const headers = [
  { title: t('label.order_no'), key: 'work.orderNo' },
  { title: t('label.product'), key: 'work.product.sku' },
  {
    title: t('label.product_category'),
    key: 'work.product.productGroup.productCategory.name',
  },
  { title: t('label.job'), key: 'type' },
  { title: t('label.done_at'), key: 'doneAt' },
  { title: t('label.quantity'), key: 'quantityPerTask' },
  { title: t('label.cost'), key: 'costPerTask' },
  { title: t('label.payable'), key: 'payablePerTask' },
];
const groupBy = ref([
  {
    key: 'type',
    order: 'asc' as const,
  },
  {
    key: 'work.product.productGroup.productCategory.name',
    order: 'asc' as const,
  },
]);

function manageDates(newDates: string[] | string) {
  form.startDate = newDates[0] ?? '';
  form.endDate = newDates[newDates.length - 1] ?? '';
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
      downloadPdf();
      appBarSTore.isPrintClicked = false;
    }
  },
);

const { current } = useTheme();
const primary = current.value.colors.primary;
console.log(`primary ${primary}`);

function downloadPdf() {
  appBarSTore.isPrinting = true;
  const img = new Image();
  img.src = ic_borsa;

  img.onload = function () {
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
    const artisans = data.value?.getPayroll.artisans;

    if (artisans) {
      artisans.forEach((artisan, index) => {
        if (index > 0) {
          doc.addPage();
        }
        const imgWidth = 13;

        doc.setFont(pageFont, 'normal');
        doc.setFontSize(subtitleFontSize);
        const comp = 'PT Ansulindo Kharisma Lestari';
        const textWidth = doc.getTextWidth(comp);

        const imgX = (pageWidth - (imgWidth + textWidth + margin / 2)) / 2;
        doc.addImage(img, 'PNG', imgX, pageMargin, imgWidth, imgWidth);

        const compX = imgX + imgWidth + margin / 2;
        const compY = pageMargin + margin * 0.6;
        doc.text(comp, compX, compY);
        doc.setFontSize(contentFontSize);
        doc.text(
          'Jl. Kopo Jaya I No. 3\nBandung, 40224',
          compX,
          compY + margin,
        );

        doc.setFont(pageFont, 'bold');
        doc.setFontSize(titleFontSize);
        const titleY = 48;
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
              String(adapter.format(task.doneAt, 'normalDateWithWeekday')),
              String(t('label.pairs', task.quantityPerTask)),
              String(formatRupiah(task.costPerTask)),
              String(formatRupiah(task.payablePerTask)),
            ];
          }) ?? [];

        const dateY = titleY + margin;
        doc.setFont(pageFont, 'normal');
        doc.setFontSize(12);
        doc.text(
          `${t('label.start_date')}: ${adapter.format(
            form.startDate,
            'fullDate',
          )} | ${t('label.end_date')}: ${adapter.format(
            form.endDate,
            'fullDate',
          )} | ${t('label.pay_date')}: ${adapter.format(now, 'fullDate')}`,
          pageWidth / 2,
          dateY,
          { align: 'center' },
        );
        const nameY = dateY + margin * 2;
        const labelNamePosition = `${t('label.name')}:\n${t('label.jobs')}:`;
        doc.text(labelNamePosition, pageMargin, nameY);
        doc.setFont(pageFont, 'bold');
        doc.text(
          `${name}\n${artisan.jobs.map((job) => t(renderJob(job))).join(', ')}`,
          doc.getTextWidth(labelNamePosition),
          nameY,
        );

        const totalY = nameY;

        const qtyPayable = `${quantity}\n${payable}`;
        const labelQtyPayable = `${t('label.total_quantity')}:\n${t('label.total_payable')}:`;
        doc.setFont(pageFont, 'bold');
        doc.text(qtyPayable, pageWidth - pageMargin, totalY, {
          align: 'right',
        });
        doc.setFont(pageFont, 'normal');
        const amtWidth = doc.getTextWidth(qtyPayable);
        doc.text(labelQtyPayable, pageWidth - amtWidth, totalY, {
          align: 'right',
        });

        const tableY = nameY + margin * 2;
        let lastTableY = 0;
        autoTable(doc, {
          theme: 'grid',
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
          styles: { font: 'helvetica', fontSize: 9 },
          headStyles: { fillColor: [84, 123, 138] },
          didDrawPage: (d) => {
            lastTableY = Math.round(d.cursor?.y || 120);
          },
        });

        doc.setFont(pageFont, 'normal');
        doc.text(
          `${t('label.checker_sign')}:`,
          pageMargin,
          lastTableY + margin * 2,
        );
        doc.text(
          `${t('label.artisan_sign')}:`,
          pageWidth - pageMargin,
          lastTableY + margin * 2,
          {
            align: 'right',
          },
        );
      });
    }

    const pageCount = doc.internal.pages.length - 1;
    doc.setFont(pageFont, 'normal');
    doc.setFontSize(10);
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.text(
        `Page ${i} of ${pageCount}`,
        pageWidth - pageMargin / 2,
        pageHeight - pageMargin / 2,
        {
          align: 'right',
        },
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
