<template>
  <v-skeleton-loader v-if="isFetching" type="table"></v-skeleton-loader>
  <v-data-table
    v-else
    :headers="headers"
    :items="data.getProducts"
    item-value="id"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    class="flex-grow-1"
  >
    <template v-slot:item.productColors="{ item }">
      <v-list density="compact">
        <v-list-item v-for="color in item.productColors">
          <template #prepend>
            <div
              class="color-box"
              :style="{ backgroundColor: color.color.hexCode }"
            />
          </template>
          <span>{{ color.color.name }}</span>
        </v-list-item>
      </v-list>
    </template>
    <template v-slot:item.productGroup.productCategory.gender="{ item }">
      {{ $t(renderGender(item.productGroup.productCategory.gender)) }}
    </template>

    <template v-slot:item.actions="{ item }">
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
      <NuxtLink :to="$localePath(`/products/update/${item.id}`)">
        <v-btn color="primary" :prepend-icon="mdiPencil" variant="text">{{
          $t('btn.update')
        }}</v-btn>
      </NuxtLink>
    </template>
  </v-data-table>
</template>

<style scoped>
.color-box {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteProductDocument,
  GetProductsDocument,
  type ColorToProductWithColor,
} from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data, isFetching } = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});

const { t } = useI18n();
const headers: ReadOnlyHeaders = [
  { title: t('label.id'), key: 'id' },
  { title: t('label.sku'), key: 'sku' },
  { title: t('label.product_group'), key: 'productGroup.skuNumeric' },
  {
    title: t('label.product_category'),
    key: 'productGroup.productCategory.name',
  },
  { title: t('label.gender'), key: 'productGroup.productCategory.gender' },
  { title: t('label.colors'), key: 'productColors', minWidth: '140' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

const extractColors = (productColors: any[]) => {
  let stringResult = '';
  (productColors as ColorToProductWithColor[]).forEach((productColor) => {
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
