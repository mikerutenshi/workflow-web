<template>
  <div v-if="data" class="fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getProducts"
      item-value="id"
      :sort-by="[{ key: 'id', order: 'asc' }]"
      class="flex-grow-1"
    >
      <template v-slot:item.productColors="{ item }">
        {{ extractColors(item.productColors) }}
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
              <NuxtLink :to="`/products/update/${item.id}`">
                <v-list-item-title>Edit</v-list-item-title>
              </NuxtLink>
            </v-list-item>
            <v-list-item @click="deleteProduct(item.id, index)">
              <v-list-item-title>Delete</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu> -->
        <NuxtLink :to="`/products/update/${item.id}`">
          <v-btn color="primary" icon="mdi-pencil" variant="text"></v-btn>
        </NuxtLink>
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
</style>

<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteProductDocument,
  GetProductsDocument,
  type ProductColorsWithColor,
} from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data, execute: executeGetProducts } = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});

const headers: ReadOnlyHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'SKU', key: 'sku' },
  { title: 'Product Group', key: 'productGroup.skuNumeric' },
  { title: 'Category', key: 'productGroup.productCategory.name' },
  { title: 'Gender', key: 'productGroup.productCategory.gender' },
  { title: 'Colors', key: 'productColors' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

const extractColors = (productColors: any[]) => {
  let stringResult = '';
  (productColors as ProductColorsWithColor[]).forEach((productColor) => {
    stringResult += `${productColor.order}. ${productColor.color.name}, `;
  });
  return stringResult.slice(0, -2);
};

const deleteProduct = (id: string, index: number) => {
  const { execute } = useMutation(DeleteProductDocument, {
    clearCacheTags: [CACHE_PRODUCTS],
  });

  execute({ id })
    .then((response) => {
      if (response.data?.deleteProduct) {
        data.value?.getProducts.splice(index, 1);
        alert('Product deleted successfully');
      } else {
        alert('Failed to delete product');
      }
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    });
};
</script>
