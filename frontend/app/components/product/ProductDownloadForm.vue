<template>
  <v-row v-if="errorProductGroups || errorProducts" type="error">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(errorProductGroups || errorProducts) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-card-text>
    <v-row>
      <v-col>
        <v-checkbox
          label="Download Product Groups"
          v-model="selections"
          :value="Option.ProductGroup"
        ></v-checkbox>
      </v-col>
      <v-col
        v-if="dataProductGroups && selections.includes(Option.ProductGroup)"
      >
        <h3>Product Groups can be opened in: {{ fullUrlProductGroups }}</h3>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-checkbox
          label="Download Products"
          v-model="selections"
          :value="Option.Product"
        ></v-checkbox>
      </v-col>
      <v-col v-if="dataProducts && selections.includes(Option.Product)">
        <h3>Products can be opened in: {{ fullUrlProducts }}</h3>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-actions>
    <v-btn color="primary" @click="download"> Download </v-btn>
  </v-card-actions>
</template>

<script lang="ts" setup>
import { mdiContentSave } from '@mdi/js';
import { useQuery } from 'villus';
import { ref, watch } from 'vue';
import {
  DownloadProductGroupsDocument,
  DownloadProductsDocument,
} from '~/api/generated/types';

const {
  execute: executeProducts,
  data: dataProducts,
  isFetching: isFetchingProducts,
  error: errorProducts,
} = useQuery({
  query: DownloadProductsDocument,
  fetchOnMount: false,
  onData(data) {
    const config = useRuntimeConfig();
    const routerBase = config.public.baseUrl.slice(
      0,
      config.public.baseUrl.lastIndexOf('/'),
    );

    const url = data?.downloadProducts;
    if (!url) return;

    fullUrlProducts.value = `${routerBase}${url}`;
  },
});

const {
  execute: executeProductGroups,
  data: dataProductGroups,
  isFetching: isFetchingProductGroups,
  error: errorProductGroups,
} = useQuery({
  query: DownloadProductGroupsDocument,
  fetchOnMount: false,
  onData(data) {
    const config = useRuntimeConfig();
    const routerBase = config.public.baseUrl.slice(
      0,
      config.public.baseUrl.lastIndexOf('/'),
    );

    const url = data?.downloadProductGroups;
    if (!url) return;

    fullUrlProductGroups.value = `${routerBase}${url}`;
  },
});

const fullUrlProducts = ref('');
const fullUrlProductGroups = ref('');
const selections = ref([] as Option[]);
enum Option {
  Product = 'PRODUCT',
  ProductGroup = 'PRODUCT_GROUP',
}

const download = async () => {
  if (selections.value.includes(Option.Product)) {
    const res = await fetch(fullUrlProducts.value);
    console.log(fullUrlProducts);
    if (!res.ok) throw new Error(`Download failed: ${res.status}`);

    const blob = await res.blob();
    const csvBlob = new Blob([blob], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = URL.createObjectURL(csvBlob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = 'products';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(blobUrl);
  }

  if (selections.value.includes(Option.ProductGroup)) {
    const res = await fetch(fullUrlProductGroups.value);
    console.log(fullUrlProductGroups);
    if (!res.ok) throw new Error(`Download failed: ${res.status}`);

    const blob = await res.blob();
    const csvBlob = new Blob([blob], { type: 'text/csv;charset=utf-8;' });
    const blobUrl = URL.createObjectURL(csvBlob);

    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = 'product-groups';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();

    URL.revokeObjectURL(blobUrl);
  }
};

watch(selections, (newSelections) => {
  if (newSelections.includes(Option.Product)) {
    executeProducts();
  }

  if (newSelections.includes(Option.ProductGroup)) {
    executeProductGroups();
  }
});
</script>
