<template>
  <div v-if="data" class="fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getProductGroups"
      class="elevation-1 full-height pa-4"
      item-value="id"
      :sort-by="[{ key: 'id', order: 'asc' }]"
    >
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
import { useMutation, useQuery } from 'villus';
import {
  GetProductsDocument,
  DeleteProductDocument,
  type ProductColorsWithColor,
  GetProductGroupsDocument,
} from '~/api/generated/types';
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import type { VDataTable } from 'vuetify/components';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data, execute } = useQuery({
  query: GetProductGroupsDocument,
});

// onMounted(() => {
//   const route = useRoute();
//   const isInvalidateTable = route.query.isInvalidateTable;
//   if (isInvalidateTable) execute();
//   console.log(`Route param -> ${isInvalidateTable}`);
// });

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

// const deleteProduct = (id: string, index: number) => {
//   const { execute } = useMutation(DeleteProductDocument);

//   execute({ id })
//     .then((response) => {
//       if (response.data?.deleteProduct) {
//         alert('Product deleted successfully');
//         data.value?.getProducts.slice(index, 1);
//       } else {
//         alert('Failed to delete product');
//       }
//     })
//     .catch((error) => {
//       console.error('Error deleting product:', error);
//       alert('An error occurred while deleting the product.');
//     });
// };
</script>
