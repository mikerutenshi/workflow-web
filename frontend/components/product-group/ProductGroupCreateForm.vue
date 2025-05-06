<template>
  <v-row justify="center">
    <v-col>
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
        <v-text-field
          v-model="form.skuNumeric"
          @keypress="(e: any) => /[0-9]/.test(e.key) || e.preventDefault()"
          :label="$t('label.sku_numeric')"
        />
        <v-text-field v-model="form.name" :label="$t('label.product_name')" />

        <v-row>
          <v-col>
            <v-autocomplete
              v-model="form.productCategoryId"
              :label="$t('label.product_category')"
              auto-select-first
              item-value="id"
              item-title="name"
              :items="data?.getProductCategories"
              :loading="isFetchingQuery"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :title="item.raw.name"
                  :subtitle="$t(renderGender(item.raw.gender))"
                >
                  <template #append>
                    <NuxtLink
                      :to="
                        $localePath(`/product-categories/update/${item.raw.id}`)
                      "
                    >
                      <v-btn
                        color="primary"
                        :icon="mdiPencil"
                        size="small"
                        variant="text"
                      ></v-btn>
                    </NuxtLink>
                  </template>
                </v-list-item>
              </template>
            </v-autocomplete>
          </v-col>
          <v-col cols="12" md="4" class="d-flex align-center justify-end">
            <NuxtLink :to="$localePath('/product-categories/create')">
              <v-btn :prepend-icon="mdiPlus" color="primary">{{
                $t('create_btn.product_category')
              }}</v-btn>
            </NuxtLink>
          </v-col>
        </v-row>

        <div class="d-flex mt-4">
          <ActionCancel></ActionCancel>
          <ActionConfirm v-if="productGroupId" :loading="isUpdating">{{
            $t('btn.update')
          }}</ActionConfirm>
          <ActionConfirm v-else :loading="isCreating">{{
            $t('btn.create')
          }}</ActionConfirm>
          <ActionDelete
            v-if="productGroupId"
            @click="executeDelete({ id: productGroupId })"
          ></ActionDelete>
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
import { mdiPencil, mdiPlus } from '@mdi/js';

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
