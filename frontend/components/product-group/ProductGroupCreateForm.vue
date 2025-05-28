<template>
  <v-form class="h-100 d-flex flex-column" @submit.prevent="onSubmit">
    <v-row>
      <v-col>
        <v-row v-if="createError || updateError">
          <v-col>
            <v-alert type="error">
              {{ extractGraphQlError(createError || updateError) }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              v-model="productCategoryId.value.value"
              :error-messages="productCategoryId.errorMessage.value"
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
            </v-select>
          </v-col>

          <v-col cols="12" md="4" class="d-flex align-center justify-end">
            <NuxtLink :to="$localePath('/product-categories/create')">
              <v-btn :prepend-icon="mdiPlus" color="primary">{{
                $t('create_btn.product_category')
              }}</v-btn>
            </NuxtLink>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="skuNumeric.value.value"
              :error-messages="skuNumeric.errorMessage.value"
              :label="$t('label.sku_numeric')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              :label="$t('label.product_name')"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="flex-grow-1"></v-row>

    <v-row align="end" class="ma-1">
      <ActionCancel></ActionCancel>
      <ActionConfirm v-if="productGroupId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
      <ActionDelete
        :loading="isDeleting"
        v-if="productGroupId"
        @click="executeDelete({ id: productGroupId })"
      ></ActionDelete>
    </v-row>
  </v-form>
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
import { ProductGroupSchema } from '~/validation/schema';

const route = useRoute();
const productGroupId = ref(route.params.id as string);

const authStore = useAuthStore();
const router = useRouter();
const userId = authStore.user?.id ?? '';

const validationSchema = toTypedSchema(ProductGroupSchema);
const { handleSubmit, setValues, values } = useForm({
  validationSchema,
  initialValues: {
    createdBy: userId,
  },
});
const skuNumeric = useField('skuNumeric');
const name = useField('name');
const productCategoryId = useField('productCategoryId');

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
const { execute: executeDelete, isFetching: isDeleting } = useMutation(
  DeleteProductGroupDocument,
  {
    clearCacheTags: [CACHE_PRODUCT_GROUPS],
    onData() {
      goPrevious();
    },
    onError(err) {
      alert(`Error while deleting product group -> ${err}`);
    },
  }
);
const onSubmit = handleSubmit((data) => {
  if (productGroupId.value) {
    executeUpdate({ id: productGroupId.value, data });
  } else {
    executeCreate({ data });
  }
});

if (productGroupId.value) {
  useQuery({
    query: GetProductGroupDocument,
    variables: { id: productGroupId.value },
    onData(data) {
      const pg = data.getProductGroup;
      setValues({
        skuNumeric: pg.skuNumeric,
        name: pg.name,
        productCategoryId: pg.productCategory.id,
        createdBy: pg.createdBy,
        updatedBy: userId,
      });
    },
    onError(err) {
      alert(`Get Product Group  Error -> ${err}`);
    },
    tags: [CACHE_PRODUCT_GROUP],
  });
}
const goPrevious = () => {
  router.go(-1);
};

// watchEffect(() => {
//   console.log(JSON.stringify(values));
// });
</script>
