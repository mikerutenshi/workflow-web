<template>
  <v-row justify="center">
    <v-col>
      <v-date-input
        :label="$t('label.date')"
        variant="outlined"
        multiple="range"
        class="ma-4"
        v-model="datePicker"
        show-adjacent-months
      ></v-date-input>

      <v-card>
        <v-row no-gutters align="center">
          <v-col class="d-flex flex-column align-center my-2" cols="6">
            <div style="text-align: left">
              <p>{{ $t('label.total_payable') }}</p>
              <h2>{{ formatRupiah(data?.getPayroll.totalPayable) }}</h2>
            </div>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="d-flex flex-column align-center my-2" cols="6">
            <div style="text-align: left">
              <p>{{ $t('label.total_quantity') }}</p>
              <h2>
                {{ $t('label.pairs', data?.getPayroll.totalQuantity ?? 0) }}
              </h2>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-for="artisan in data?.getPayroll.artisans" class="my-4">
        <v-card-title>
          {{ `${artisan.firstName} ${artisan.lastName ?? ''}` }}
        </v-card-title>
        <v-card-subtitle class="d-flex align-center">
          <span class="mr-2">{{ $t('label.payable') }}</span>
          <h3 class="my-2">
            {{ formatRupiah(artisan.payablePerArtisan) }}
          </h3>
          <v-divider vertical class="mx-4"></v-divider>
          <span class="mr-2">{{ $t('label.quantity') }}</span>
          <h3 class="my-2">
            {{ $t('label.pairs', artisan.quantityPerArtisan) }}
          </h3>
        </v-card-subtitle>

        <v-card-text>
          <v-data-table
            :items="artisan.tasks"
            :headers="headers"
            hide-default-footer
          >
            <template #item.type="{ item }">
              {{ $t(renderJob(item.type)) }}
            </template>
            <template #item.doneAt="{ item }">
              {{ formatLocalDate(item.doneAt) }}
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
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="sass">
.margin-top-appbar-height
  margin-top: $appbar-height
</style>

<script setup lang="ts">
import { useQuery } from 'villus';
import { GetPayrollDocument } from '~/api/generated/types';

const today = new Date();
const thursday = new Date();

if (today.getDay() > 5) {
  // If today is after Friday, get next Thursday
  thursday.setDate(today.getDate() + ((4 - today.getDay() + 7) % 7));
} else {
  // If today is Friday or earlier, get previous Thursday
  thursday.setDate(today.getDate() - ((today.getDay() + 3) % 7));
}
const form = reactive({
  startDate: new Date(new Date(thursday).setDate(thursday.getDate() - 6)),
  endDate: new Date(thursday),
});
const datePicker = ref([
  ...Array.from(
    {
      length:
        (form.endDate.getTime() - form.startDate.getTime()) /
          (1000 * 60 * 60 * 24) +
        1,
    },
    (_, i) => new Date(form.startDate.getTime() + i * (1000 * 60 * 60 * 24))
  ),
]);

const { execute, data } = useQuery({
  query: GetPayrollDocument,
  cachePolicy: 'network-only',
  tags: [CACHE_PAYROLL],
  variables: computed(() => ({
    startDate: form.startDate,
    endDate: form.endDate,
  })),
  paused: true,
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

watch(
  datePicker,
  (newDates: Date[]) => {
    form.startDate = new Date(
      newDates
        .reduce((min, date) => (date < min ? date : min))
        .setHours(0, 0, 0, 0)
    );

    form.endDate = new Date(
      newDates
        .reduce((max, date) => (date > max ? date : max), newDates[0])
        .setHours(23, 59, 59, 999)
    );
    execute();
  },
  { immediate: true }
);
</script>
