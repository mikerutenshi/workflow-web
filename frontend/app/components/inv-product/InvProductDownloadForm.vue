<template>
  <v-row v-if="errorInvProducts" type="error">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(errorInvProducts) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-card-text>
    <v-row v-if="dataInvProducts">
      <v-col>
        <h3>Inventory Products can be opened in: {{ fullUrlInvProducts }}</h3>
      </v-col>
    </v-row>
  </v-card-text>
  <v-card-actions>
    <v-btn
      color="primary"
      :disabled="!fullUrlInvProducts"
      :loading="isFetchingInvProducts"
      @click="download"
    >
      Download
    </v-btn>
  </v-card-actions>
</template>

<script lang="ts" setup>
import { useQuery } from 'villus';
import { ref } from 'vue';
import { DownloadInvProductsDocument } from '~/api/generated/types';

const fullUrlInvProducts = ref('');

const {
  data: dataInvProducts,
  isFetching: isFetchingInvProducts,
  error: errorInvProducts,
} = useQuery({
  query: DownloadInvProductsDocument,
  onData(data) {
    const config = useRuntimeConfig();
    const routerBase = config.public.baseUrl.slice(
      0,
      config.public.baseUrl.lastIndexOf('/'),
    );

    const url = data?.downloadInvProducts;
    if (!url) return;

    fullUrlInvProducts.value = `${routerBase}${url}`;
  },
});

const download = async () => {
  const res = await fetch(fullUrlInvProducts.value);
  if (!res.ok) throw new Error(`Download failed: ${res.status}`);

  const blob = await res.blob();
  const csvBlob = new Blob([blob], { type: 'text/csv;charset=utf-8;' });
  const blobUrl = URL.createObjectURL(csvBlob);

  const anchor = document.createElement('a');
  anchor.href = blobUrl;
  anchor.download = 'inv-products';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();

  URL.revokeObjectURL(blobUrl);
};
</script>
