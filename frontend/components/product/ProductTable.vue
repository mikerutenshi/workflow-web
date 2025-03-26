{he}
<template>
  <div v-if="data" class="fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getProducts"
      class="elevation-1 full-height pa-4"
      item-value="id"
    >
      <template v-slot:item.productColors="{ item }">
        {{ extractColors(item.productColors) }}
      </template>

      <template v-slot:item.actions="{ item }">
        <v-menu variant="outlined">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" variant="text">
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-item @click="deleteProduct(item)">
              <v-list-item-title>Delete</v-list-item-title>
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
import { useMutation, useQuery } from 'villus';
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
  { titlle: '', key: 'actions', sortable: false, align: 'end' },
];

const extractColors = (productColors: any[]) => {
  let stringResult = '';
  (productColors as ProductColorsWithColor[]).forEach((productColor) => {
    stringResult += `${productColor.order}) ${productColor.color.name}, `;
  });
  return stringResult.slice(0, -2);
};

const deleteProduct = (item: any) => {
  const { execute } = useMutation({
    query: `
      mutation DeleteProduct($id: ID!) {
        deleteProduct(id: $id) {
          success
          message
        }
      }
    `,
  });

  execute({ id: item.id })
    .then((response) => {
      if (response.data?.deleteProduct?.success) {
        alert('Product deleted successfully');
        // Optionally, refetch the product list or update the UI
      } else {
        alert(
          `Failed to delete product: ${response.data?.deleteProduct?.message}`
        );
      }
    })
    .catch((error) => {
      console.error('Error deleting product:', error);
      alert('An error occurred while deleting the product.');
    });
};
</script>
