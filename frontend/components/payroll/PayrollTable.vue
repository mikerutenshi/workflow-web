<template>
  <v-row justify="center" class="mt-4">
    <v-col>
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
            {{ artisan.quantityPerArtisan }}
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
            <template #item.payablePerTask="{ item }">
              {{ formatRupiah(item.payablePerTask) }}
            </template>
            <template #item.costPerTask="{ item }">
              {{ formatRupiah(item.costPerTask) }}
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

const { data } = useQuery({ query: GetPayrollDocument, tags: [CACHE_PAYROLL] });

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
  { title: t('label.payable'), key: 'payablePerTask' },
  { title: t('label.cost'), key: 'costPerTask' },
  { title: t('label.quantity'), key: 'quantityPerTask' },
];
</script>
