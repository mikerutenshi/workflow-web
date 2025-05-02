<template>
  <div v-if="data" class="wf-fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getProductGroups"
      class="elevation-1 flex-grow-1"
      item-value="id"
      :sort-by="[{ key: 'id', order: 'asc' }]"
    >
      <template v-slot:item.drawUpper="{ item }">
        {{
          formatRupiah(
            item.laborCosts?.find((found) => found?.type === JOB.DRAW_UPPER)
              ?.cost
          ) ?? ''
        }}
      </template>

      <template v-slot:item.drawLining="{ item }">
        {{
          formatRupiah(
            item.laborCosts?.find((found) => found?.type === JOB.DRAW_LINING)
              ?.cost
          ) ?? ''
        }}
      </template>

      <template v-slot:item.stitchUpper="{ item }">
        {{
          formatRupiah(
            item.laborCosts?.find((found) => found?.type === JOB.STITCH_UPPER)
              ?.cost
          ) ?? ''
        }}
      </template>

      <template v-slot:item.stitchOutsole="{ item }">
        {{
          formatRupiah(
            item.laborCosts?.find((found) => found?.type === JOB.STITCH_OUTSOLE)
              ?.cost
          ) ?? ''
        }}
      </template>

      <template v-slot:item.stitchInsole="{ item }">
        {{
          formatRupiah(
            item.laborCosts?.find((found) => found?.type === JOB.STITCH_INSOLE)
              ?.cost
          ) ?? ''
        }}
      </template>

      <template v-slot:item.last="{ item }">
        {{
          formatRupiah(
            item.laborCosts?.find((found) => found?.type === JOB.LAST)?.cost
          ) ?? ''
        }}
      </template>

      <template v-slot:item.actions="{ item, index }">
        <!-- <v-menu variant="outlined">
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
        </v-menu> -->
        <NuxtLink :to="`/labor-costs/update/${item.id}`">
          <v-btn color="primary" :icon="mdiPencil" variant="text"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js';
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
      { title: 'Draw Upper', key: 'drawUpper' },
      { title: 'Draw Lining', key: 'drawLining' },
      { title: 'Stitch Upper', key: 'stitchUpper' },
      { title: 'Last', key: 'last' },
      { title: 'Stitch Outsole', key: 'stitchOutsole' },
      { title: 'Stitch Insole', key: 'stitchInsole' },
    ],
  },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
</script>
