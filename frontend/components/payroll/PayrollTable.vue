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
              <p>{{ $t('label.total_payable') }}</p>
              <h2>{{ formatRupiah(data?.getPayroll.totalPayable) }}</h2>
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
              <p>{{ $t('label.total_quantity') }}</p>
              <h2>
                {{ $t('label.pairs', data?.getPayroll.totalQuantity ?? 0) }}
              </h2>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>

  <v-row>
    <v-col>
      <v-skeleton-loader type="card@3" v-if="isFetching"></v-skeleton-loader>
      <v-expansion-panels v-else>
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
                <span>{{ $t('label.payable') }}</span>
                <h3 class="ml-auto">
                  {{ formatRupiah(artisan.payablePerArtisan) }}
                </h3>
              </div>
              <div class="d-flex align-end justify-space-between mr-8">
                <span>{{ $t('label.quantity') }}</span>
                <h3 class="ml-auto">
                  {{ $t('label.pairs', artisan.quantityPerArtisan) }}
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
                {{ adapter.format(item.doneAt, 'fullDate') }}
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

const adapter = useDate();
const now = dayjs();
dayjs.extend(weekday);

const nextThurs =
  now.day() <= 7
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
  { title: t('label.product'), key: 'work.product.sku' },
  { title: t('label.job'), key: 'type' },
  { title: t('label.done_at'), key: 'doneAt' },
  { title: t('label.payable'), key: 'payablePerTask' },
  { title: t('label.quantity'), key: 'quantityPerTask' },
  { title: t('label.cost'), key: 'costPerTask' },
];

function manageDates(newDates: string[] | string) {
  form.startDate = newDates[0];
  form.endDate = newDates[newDates.length - 1];
  execute();
}

watch(
  form,
  (newForm) => {
    console.log(`Payroll Form: ${JSON.stringify(newForm)}`);
  },
  { deep: true, immediate: true }
);
</script>
