<template>
  <v-row v-if="error" type="error">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(error) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-card-text>
    <h3 v-if="isFetching">Product is downloading...</h3>
    <div v-else-if="data">
      <h3>Product can be open in: {{ data.downloadProducts }}</h3>
      <v-btn color="primary" @click="downloadProduct"> Download </v-btn>
    </div>
  </v-card-text>
</template>

<script lang="ts" setup>
import { useQuery } from 'villus';
import { DownloadProductsDocument } from '~/api/generated/types';

const { data, isFetching, error } = useQuery({
  query: DownloadProductsDocument,
  fetchOnMount: true,
});

const downloadProduct = async () => {
  const config = useRuntimeConfig();
  const routerBase = config.public.baseUrl.replace('/graphql', '');

  const url = data?.value?.downloadProducts;
  if (!url) return;

  const fullUrl = `${routerBase}${url}`;
  const res = await fetch(fullUrl);
  console.log(fullUrl);
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
};
</script>
