{he}
<template>
  <div v-if="data" class="fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getProducts"
      class="elevation-1 full-height pa-4"
    >
      <template v-slot:item.productColors="{ item }">
        {{ extractColors(item.productColors) }}
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
import {
  GetProductsDocument,
  type ProductColorsWithColor,
} from '~/api/generated/types';

const { data } = useQuery({
  query: GetProductsDocument,
});

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'SKU', key: 'sku' },
  { title: 'Product Group', key: 'productGroup.skuNumeric' },
  { title: 'Category', key: 'productGroup.productCategory.name' },
  { title: 'Gender', key: 'productGroup.productCategory.gender' },
  { title: 'Colors', key: 'productColors' },
];

const extractColors = (productColors: any[]) => {
  let stringResult = '';
  (productColors as ProductColorsWithColor[]).forEach((productColor) => {
    stringResult += `${productColor.order}) ${productColor.color.name}, `;
  });
  return stringResult.slice(0, -2);
};
</script>
