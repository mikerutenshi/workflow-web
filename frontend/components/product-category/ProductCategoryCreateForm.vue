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
        <v-text-field v-model="form.name" :label="$t('label.name')" />
        <v-autocomplete
          v-model="form.gender"
          :label="$t('label.gender')"
          auto-select-first
          item-value="id"
          item-title="name"
          :items="genders"
        >
          <template v-slot:item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="$t(renderGender(item.title as Gender))"
            ></v-list-item>
          </template>
          <template v-slot:selection="{ item }">
            <span>{{ $t(renderGender(item.title as Gender)) }}</span>
          </template>
        </v-autocomplete>

        <div class="d-flex mt-4">
          <ActionCancel></ActionCancel>
          <ActionConfirm v-if="productCategoryId" :loading="isUpdating">{{
            $t('btn.update')
          }}</ActionConfirm>
          <ActionConfirm v-else :loading="isCreating">{{
            $t('btn.create')
          }}</ActionConfirm>
          <ActionDelete
            v-if="productCategoryId"
            @click="executeDelete({ id: productCategoryId })"
          ></ActionDelete>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import { useRoute, useRouter } from 'vue-router';
import {
  CreatePrdouctCategoryDocument,
  DeleteProductCategoryDocument,
  Gender,
  GetProductCategoryDocument,
  UpdateProductCategoryDocument,
} from '~/api/generated/types';

const route = useRoute();
const productCategoryId = ref(route.params.id as string);

const router = useRouter();
const form = reactive({
  name: '',
  gender: '',
});
const genders = ref(['MEN', 'WOMEN', 'KIDS']);
const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreatePrdouctCategoryDocument, {
  onData() {
    goPrevious();
  },
  clearCacheTags: [CACHE_PRODUCT_CATEGORIES],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateProductCategoryDocument, {
  onData() {
    goPrevious();
  },
  clearCacheTags: [CACHE_PRODUCT_CATEGORIES, CACHE_PRODUCT_CATEGORY],
});
const { execute: executeDelete } = useMutation(DeleteProductCategoryDocument, {
  clearCacheTags: [CACHE_PRODUCT_CATEGORIES],
  onData() {
    goPrevious();
  },
  onError(err) {
    alert(`Error while deleting product category -> ${err}`);
  },
});
const handleSubmit = () => {
  if (productCategoryId.value) {
    executeUpdate({ id: productCategoryId.value, data: form });
  } else {
    executeCreate({ data: form });
  }
};

const goPrevious = () => {
  router.go(-1);
};

if (productCategoryId.value) {
  useQuery({
    query: GetProductCategoryDocument,
    variables: { id: productCategoryId.value },
    onData(data) {
      const category = data.getProductCategory;
      form.name = category.name;
      form.gender = category.gender;
    },
    onError(err) {
      alert(`Get Product Category  Error -> ${err}`);
    },
    tags: [CACHE_PRODUCT_CATEGORY],
  });
}
watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
