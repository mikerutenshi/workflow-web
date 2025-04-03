<template>
  <div v-if="data" class="fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getProductGroups"
      class="elevation-1 full-height pa-4"
      item-value="id"
      :sort-by="[{ key: 'id', order: 'asc' }]"
    >
      <template v-slot:item.laborCost.drawingUpper="{ item }">
        {{ formatToRupiah(item.laborCost?.drawingUpper) }}
      </template>

      <template v-slot:item.laborCost.drawingLining="{ item }">
        {{ formatToRupiah(item.laborCost?.drawingLining) }}
      </template>

      <template v-slot:item.laborCost.stitchingUpper="{ item }">
        {{ formatToRupiah(item.laborCost?.stitchingUpper) }}
      </template>

      <template v-slot:item.laborCost.stitchingOutsole="{ item }">
        {{ formatToRupiah(item.laborCost?.stitchingOutsole) }}
      </template>

      <template v-slot:item.laborCost.stitchingInsole="{ item }">
        {{ formatToRupiah(item.laborCost?.stitchingInsole) }}
      </template>

      <template v-slot:item.laborCost.lasting="{ item }">
        {{ formatToRupiah(item.laborCost?.lasting) }}
      </template>

      <template v-slot:item.actions="{ item, index }">
        <v-menu variant="outlined">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="text">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <NuxtLink :to="`/labor-costs/update/${item.id}`">
                <v-list-item-title>Edit</v-list-item-title>
              </NuxtLink>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
.fill-screen {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.full-height {
  flex-grow: 1; /* Expand to fill available space */
}
</style>

<script setup lang="ts">
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  GetProductGroupsDocument,
  type LaborCost,
} from '~/api/generated/types';

type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data } = useQuery({
  query: GetProductGroupsDocument,
  tags: [CACHE_PRODUCT_GROUPS],
});

const headers: ReadOnlyHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'Product Group', key: 'skuNumeric' },
  { title: 'Category', key: 'productCategory.name' },
  { title: 'Gender', key: 'productCategory.gender' },
  {
    title: 'Labor Costs',
    align: 'center',
    children: [
      { title: 'Drawing Upper', key: 'laborCost.drawingUpper' },
      { title: 'Drawing Lining', key: 'laborCost.drawingLining' },
      { title: 'Stitching Upper', key: 'laborCost.stitchingUpper' },
      { title: 'Stitching Outsole', key: 'laborCost.stitchingOutsole' },
      { title: 'Stitching Insole', key: 'laborCost.stitchingInsole' },
      { title: 'Lasting', key: 'laborCost.lasting' },
    ],
  },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

function formatToRupiah(amount: number | null | undefined): string {
  if (amount === undefined) return '';
  if (amount === null) return '-';
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
</script>
