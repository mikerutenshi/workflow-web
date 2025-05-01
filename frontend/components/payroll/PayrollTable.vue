<template>
  <v-row justify="center" class="mt-4">
    <v-col md="4">
      <v-card>
        <v-row no-gutters align="center">
          <v-col class="d-flex flex-column align-center my-2" cols="6">
            <div style="text-align: left">
              <p>Total Payable</p>
              <h2>{{ formatRupiah(data?.getPayroll.totalPayable) }}</h2>
            </div>
          </v-col>
          <v-divider vertical></v-divider>
          <v-col class="d-flex flex-column align-center my-2" cols="6">
            <div style="text-align: left">
              <p>Total Quantity</p>
              <h2>{{ `${data?.getPayroll.totalQuantity} pairs` }}</h2>
            </div>
          </v-col>
        </v-row>
      </v-card>

      <v-card v-for="artisan in data?.getPayroll.artisans" class="my-4">
        <v-card-title>
          {{ `${artisan.firstName} ${artisan.lastName ?? ''}` }}
        </v-card-title>
        <v-card-subtitle class="d-flex align-center">
          <span class="mr-2">Payable:</span>
          <h3 class="my-2">
            {{ formatRupiah(artisan.payablePerArtisan) }}
          </h3>
          <v-divider vertical class="mx-4"></v-divider>
          <span class="mr-2">Quantity:</span>
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
              {{ renderJob(item.type) }}
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

const headers = [
  { title: 'Product', key: 'work.product.sku' },
  { title: 'Job', key: 'type' },
  { title: 'Payable', key: 'payablePerTask' },
  { title: 'Cost', key: 'costPerTask' },
  { title: 'Quantity', key: 'quantityPerTask' },
];
</script>
