<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="4" class="translucent-background">
      <v-form class="pa-4" @submit.prevent="handleSubmit">
        <v-alert v-if="createError" type="error">
          {{ createError }}
        </v-alert>
        <v-alert v-if="updateError" type="error">
          {{ updateError }}
        </v-alert>
        <v-text-field v-model="form.sku" label="SKU" />

        <v-autocomplete
          v-model="form.productGroupId"
          label="Product Group"
          auto-select-first
          item-value="id"
          item-title="concat"
          :items="productGroupOptions"
          :loading="isFetchingProductGroups"
        />

        <v-combobox
          no-filter
          v-model="selectedColors"
          label="Select Colors"
          multiple
          chips
          auto-select-first
          :items="colorOptions"
          :loading="isFetchingColors"
          @update:search="onSearch"
        >
          <template #item="{ item, props }">
            <v-list-item v-bind="props" :title="item.value.name">
              <template #prepend>
                <div
                  class="color-box"
                  :style="{ backgroundColor: item.value.hexCode }"
                />
              </template>
            </v-list-item>
          </template>

          <template #chip="{ item, index }">
            <v-chip @click="remove(index)">
              <template #prepend>
                <div
                  :style="{ backgroundColor: item.value.hexCode }"
                  class="color-box"
                ></div>
              </template>
              <span>{{ item.value.name }}</span>
            </v-chip>
          </template>
        </v-combobox>

        <NuxtLink to="/products">
          <v-btn color="secondary" class="mr-4">Discard</v-btn>
        </NuxtLink>
        <v-btn
          v-if="isEditing"
          :loading="isUpdating"
          type="submit"
          color="primary"
          >Update</v-btn
        >
        <v-btn v-else :loading="isCreating" type="submit" color="primary"
          >Create</v-btn
        >
      </v-form>
    </v-col>
  </v-row>
</template>

<style scoped>
.color-box {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
}

.offset-appbar {
  padding-top: 64px;
}
</style>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { useMutation, useQuery } from 'villus';
import {
  UpdateProductDocument,
  CreateProductDocument,
  GetColorsDocument,
  GetProductDocument,
  GetProductGroupsDocument,
  type Color,
} from '~/api/generated/types';
import { useRoute } from 'vue-router';

const route = useRoute();
const productId = route.params.id as string;
const isEditing = ref(false);

if (productId !== undefined) {
  console.log(`ProductID -> ${productId}`);
  isEditing.value = true;
}

interface Form {
  sku: string;
  productGroupId: string;
  colorIds: string[];
  [key: string]: any; // Index signature allows dynamic properties
}
const form = reactive<Form>({
  sku: '',
  productGroupId: '',
  colorIds: [] as string[],
});

// const variables = computed(() => {
//   const authStore = useAuthStore();
//   const userId = authStore.user?.id ?? '';

//   console.log(`IsEditing -> ${isEditing.value}`);
//   if (isEditing.value) {
//     form.updatedBy = userId;
//   } else {
//     form.createdBy = userId;
//   }
//   console.log(`FOrm -> ${JSON.stringify(form)}`);

//   return isEditing.value
//     ? { id: productId, data: { ...form, updatedBy: userId } }
//     : { id: '', data: { ...form, createdBy: userId } };
// });
// const mutationDoc = computed(() => {
//   return isEditing.value ? UpdateProductDocument : CreateProductDocument;
// });

const {
  data: createData,
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateProductDocument, {
  onData() {
    navigateTo({ path: '/products', query: { isInvalidateTable: 'true' } });
  },
});
const {
  data: updateData,
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateProductDocument, {
  onData() {
    navigateTo({ path: '/products', query: { isInvalidateTable: 'true' } });
  },
});

const handleSubmit = async () => {
  const authStore = useAuthStore();
  const userId = authStore.user?.id ?? '';
  if (isEditing.value) {
    await executeUpdate({
      id: productId,
      data: { ...form, updatedBy: userId },
    });
  } else {
    await executeCreate({ data: { ...form, createdBy: userId } });
  }
};

const {
  data: colorsData,
  isFetching: isFetchingColors,
  error: colorsError,
} = useQuery({
  query: GetColorsDocument,
});
const {
  data: productGroupsData,
  isFetching: isFetchingProductGroups,
  error: productGroupsError,
} = useQuery({
  query: GetProductGroupsDocument,
});

const productGroupOptions = computed(() => {
  if (productGroupsData.value) {
    return productGroupsData.value.getProductGroups.map((productGroup) => ({
      ...productGroup,
      concat: `${productGroup.skuNumeric} (${productGroup.productCategory.gender})`,
    }));
  } else {
    return [];
  }
});

const searchQuery = ref('');
const onSearch = (query: string) => {
  searchQuery.value = query;
};
const selectedColors = ref<Color[]>([] as Color[]);
const colorOptions = computed(() => {
  if (colorsData.value) {
    return colorsData.value.getColors.filter((color) => {
      return color.name.toLowerCase().includes(searchQuery.value.toLowerCase());
    });
  }
  return [];
});

const remove = (index: number) => {
  if (index > -1) {
    selectedColors.value.splice(index, 1);
  }
};

watch([productGroupOptions, colorOptions], (newPgOpt, newCOpt) => {
  if (newPgOpt && newCOpt && isEditing.value) {
    useQuery({
      query: GetProductDocument,
      variables: { id: productId },
      onData: (data) => {
        const product = data.getProduct;
        form.sku = product.sku;
        form.productGroupId = product.productGroup.id;
        console.log(`product => ${JSON.stringify(product)}`);
        const colorIds = product.productColors.map((productColor) => {
          return productColor.color.id;
        });
        selectedColors.value = colorOptions.value.filter((color) => {
          return colorIds.includes(color.id);
        });
      },
      onError: (error) => {
        alert(`Get Product Error -> ${error}`);
      },
    });
  }
});

watchEffect(() => {
  form.colorIds = selectedColors.value.map((color) => {
    return color.id;
  });
  console.log(JSON.stringify(form));
});
</script>
