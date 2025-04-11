<template>
  <v-row justify="center">
    <v-col cols="12" md="4" class="translucent-background">
      <v-form class="pa-4" @submit.prevent="handleSubmit">
        <v-alert v-if="createError" type="error">
          {{
            createError.graphqlErrors?.[0]?.extensions?.['originalError'] ??
            createError.message
          }}
        </v-alert>
        <v-alert v-if="updateError" type="error">
          {{
            updateError.graphqlErrors?.[0]?.extensions?.['originalError'] ??
            updateError.message
          }}
        </v-alert>
        <v-text-field v-model="form.skuNumeric" label="Sku Numeric" />
        <v-text-field v-model="form.name" label="Name" />

        <v-row>
          <v-col cols="10" md="11">
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
                >
                  <template #append>
                    <NuxtLink :to="`/product-categories/update/${item.raw.id}`">
                      <v-btn
                        color="primary"
                        icon="mdi-pencil"
                        size="small"
                        variant="text"
                      ></v-btn>
                    </NuxtLink>
                  </template>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="2" md="1" class="ml-auto">
            <NuxtLink to="/product-categories/create">
              <v-btn icon="mdi-plus" color="primary"></v-btn>
            </NuxtLink>
          </v-col>
        </v-row>

        <div class="d-flex mt-4">
          <v-btn color="secondary" class="mr-4" @click="goPrevious"
            >Discard</v-btn
          >
          <v-btn
            v-if="!productGroupId"
            :loading="isCreating"
            type="submit"
            color="primary"
            >Create</v-btn
          >
          <v-btn v-else :loading="isUpdating" type="submit" color="primary"
            >Update</v-btn
          >
          <v-btn
            v-if="productGroupId"
            type="button"
            color="error"
            class="ml-auto"
            @click="executeDelete({ id: productGroupId })"
            >Delete</v-btn
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
  DeleteProductGroupDocument,
  GetProductCategoriesDocument,
  GetProductGroupDocument,
  UpdateProductGroupDocument,
} from '~/api/generated/types';
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const productGroupId = ref(route.params.id as string);

const authStore = useAuthStore();
const router = useRouter();
const userId = authStore.user?.id ?? '';
const form = reactive({
  skuNumeric: '',
  name: '',
  productCategoryId: '',
  createdBy: userId,
  updatedBy: undefined as string | undefined,
});

const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreateProductGroupDocument, {
  onData() {
    goPrevious();
  },
  clearCacheTags: [CACHE_PRODUCT_GROUPS],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateProductGroupDocument, {
  onData() {
    goPrevious();
  },
  clearCacheTags: [CACHE_PRODUCT_GROUPS, CACHE_PRODUCT_GROUP],
});
const {
  data,
  error: queryError,
  isFetching: isFetchingQuery,
} = useQuery({
  query: GetProductCategoriesDocument,
  tags: [CACHE_PRODUCT_CATEGORIES],
});
const { execute: executeDelete } = useMutation(DeleteProductGroupDocument, {
  clearCacheTags: [CACHE_PRODUCT_GROUPS],
  onData() {
    goPrevious();
  },
  onError(err) {
    alert(`Error while deleting product group -> ${err}`);
  },
});
const handleSubmit = () => {
  if (productGroupId.value) {
    executeUpdate({ id: productGroupId.value, data: form });
  } else {
    executeCreate({ data: form });
  }
};

if (productGroupId.value) {
  useQuery({
    query: GetProductGroupDocument,
    variables: { id: productGroupId.value },
    onData(data) {
      const pg = data.getProductGroup;
      form.skuNumeric = pg.skuNumeric;
      if (pg.name) form.name;
      form.productCategoryId = pg.productCategory.id;
      form.createdBy = pg.createdBy;
    },
    onError(err) {
      alert(`Get Product Group  Error -> ${err}`);
    },
    tags: [CACHE_PRODUCT_GROUP],
  });
  form.updatedBy = productGroupId.value;
}
const goPrevious = () => {
  router.go(-1);
};

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
