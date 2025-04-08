<template>
  <v-row justify="center">
    <v-col cols="12" md="4" class="translucent-background">
      <v-form class="pt-4" @submit.prevent="execute({ data: form })">
        <v-alert v-if="error" type="error">
          {{
            error.graphqlErrors?.[0]?.extensions?.['originalError'] ??
            error.message
          }}
        </v-alert>
        <v-text-field v-model="form.skuNumeric" label="Sku Numeric" />
        <v-text-field v-model="form.name" label="Name" />
        <v-autocomplete
          v-model="form.productCategoryId"
          label="Product Category"
          auto-select-first
          item-value="id"
          item-title="name"
          :items="data?.getProductCategories"
          :loading="isFetchingQuery"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :subtitle="item.raw.gender"
              :title="item.raw.name"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <div class="mt-4">
          <NuxtLink to="/product-groups">
            <v-btn color="secondary" class="mr-4">Discard</v-btn>
          </NuxtLink>
          <v-btn :loading="isFetching" type="submit" color="primary"
            >Create</v-btn
          >
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import {
  CreateProductGroupDocument,
  GetProductCategoriesDocument,
} from '~/api/generated/types';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const userId = authStore.user?.id ?? '';
const form = reactive({
  skuNumeric: '',
  name: '',
  productCategoryId: '',
  createdBy: userId,
});
const { execute, error, isFetching } = useMutation(CreateProductGroupDocument, {
  onData() {
    navigateTo('/product-groups');
  },
  clearCacheTags: [CACHE_PRODUCT_GROUPS],
});
const {
  data,
  error: queryError,
  isFetching: isFetchingQuery,
} = useQuery({
  query: GetProductCategoriesDocument,
  tags: [CACHE_PRODUCT_CATEGORIES],
});
const handleSubmit = () => {
  // todo
};

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
