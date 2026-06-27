<template>
  <v-row v-if="error" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(error) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row class="flex-grow-0">
    <v-col>
      <v-text-field
        v-model="search"
        :label="$t('label.search')"
        :prepend-inner-icon="mdiMagnify"
        hide-details
        single-line
      ></v-text-field>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="data?.getProducts"
        :search="search"
        :loading="isFetching"
        item-value="id"
        class="flex-grow-1"
        hover
        fixed-header
        :height="`calc(100vh - 240px)`"
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.productColors="{ item }">
          <div style="display: flex; flex-wrap: wrap; gap: 8px">
            <template v-for="color in item.productColors">
              <v-chip class="d-flex align-center">
                <div
                  class="color-box"
                  :style="{ backgroundColor: color.color.hexCode }"
                />
                <span>{{ color.color.name }}</span>
              </v-chip>
            </template>
          </div>
        </template>

        <!-- <template v-slot:item.productColors="{ item }">
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
        </template> -->
        <template v-slot:item.productGroup.productCategory.gender="{ item }">
          {{ $t(renderGender(item.productGroup.productCategory.gender)) }}
        </template>

        <template v-slot:item.productGroup.msrp="{ item }">
          {{ formatRupiah(item.productGroup.msrp) }}
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
          </v-menu>
          <NuxtLink :to="$localePath(`/products/update/${item.id}`)">
            <v-btn color="primary" :icon="mdiPencil" variant="text"></v-btn>
          </NuxtLink> -->
          <v-btn
            color="primary"
            :icon="mdiPencil"
            variant="text"
            @click="openEditProductDialog(item.id)"
          ></v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog :dialog-title="dialog.title" v-model="dialog.isVisible">
    <ProductCreateForm
      v-if="dialog.content === DialogContent.Edit"
      :product-id="dialog.productId"
      @close-dialog="handleDialogClose"
    ></ProductCreateForm>
    <ProductDownloadWindow
      v-if="dialog.content === DialogContent.Download"
    ></ProductDownloadWindow>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiPencil } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteProductDocument,
  GetProductsDocument,
  type ColorToProductWithColor,
} from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { registerDownload, unregisterDownload } = useDownloadProducts();
onMounted(() => registerDownload(openDownloadDialog));
onUnmounted(() => unregisterDownload());

const {
  data,
  isFetching,
  error,
  execute: executeFetch,
} = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});

const { t } = useI18n();
const headers: ReadOnlyHeaders = [
  // { title: t('label.id'), key: 'id' },
  { title: t('label.sku'), key: 'sku' },
  { title: t('label.product_group'), key: 'productGroup.skuNumeric' },
  { title: t('label.name'), key: 'productGroup.name' },
  {
    title: t('label.product_category'),
    key: 'productGroup.productCategory.name',
  },
  { title: t('label.gender'), key: 'productGroup.productCategory.gender' },
  { title: t('label.colors'), key: 'productColors', minWidth: '140' },
  { title: t('label.msrp'), key: 'productGroup.msrp' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
const search = ref('');
const pageNo = ref(1);
const itemsPerPage = ref(25);

enum DialogContent {
  Download = 'DOWNLOAD',
  None = 'NONE',
  Edit = 'EDIT',
}
const dialog = reactive({
  productId: '',
  isVisible: false,
  content: DialogContent.None,
  title: '',
});
function openEditProductDialog(productId: string) {
  dialog.productId = productId;
  dialog.isVisible = true;
  dialog.content = DialogContent.Edit;
  dialog.title = t('page.product_edit');
}
function handleDialogClose() {
  dialog.productId = '';
  dialog.isVisible = false;
  dialog.content = DialogContent.None;
  dialog.title = '';
}
function openDownloadDialog() {
  dialog.isVisible = true;
  dialog.content = DialogContent.Download;
  dialog.title = 'Download Products';
}

const extractColors = (productColors: any[]) => {
  let stringResult = '';
  (productColors as ColorToProductWithColor[]).forEach((productColor) => {
    stringResult += `${productColor.order}. ${productColor.color.name}, `;
  });
  return stringResult.slice(0, -2);
};

const deleteProduct = (id: string, index: number) => {
  const { execute } = useMutation(DeleteProductDocument, {
    refetchTags: [CACHE_PRODUCTS],
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
watch(
  () => dialog.isVisible,
  (isVisible) => {
    if (!isVisible) {
      handleDialogClose();
    }
  },
);
</script>
