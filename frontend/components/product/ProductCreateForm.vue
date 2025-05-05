<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-form class="pa-4" @submit.prevent="handleSubmit">
        <v-alert v-if="createError" type="error">
          {{ createError }}
        </v-alert>
        <v-alert v-if="updateError" type="error">
          {{ updateError }}
        </v-alert>
        <v-text-field v-model="form.sku" :label="$t('label.sku')" />

        <v-row>
          <v-col>
            <v-autocomplete
              v-model="form.productGroupId"
              :label="$t('label.product_group')"
              auto-select-first
              item-value="id"
              item-title="skuNumeric"
              :items="productGroupsData?.getProductGroups"
              :loading="isFetchingProductGroups"
            >
              <template v-slot:item="{ props, item }">
                <v-list-item
                  v-bind="props"
                  :subtitle="item.raw.productCategory.gender"
                  :title="item.raw.skuNumeric"
                >
                  <template #append>
                    <NuxtLink
                      :to="$localePath(`/product-groups/update/${item.raw.id}`)"
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
          <v-col cols="12" md="4" class="d-flex justify-end align-center">
            <NuxtLink :to="$localePath('/product-groups/create')">
              <v-btn :prepend-icon="mdiPlus" color="primary">{{
                $t('create_btn.product_group')
              }}</v-btn>
            </NuxtLink>
          </v-col>
        </v-row>

        <v-row align="center">
          <v-col>
            <v-autocomplete
              no-filter
              v-model="selectedColors"
              :label="$t('label.select_colors')"
              multiple
              chips
              auto-select-first
              :items="filteredColors"
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
                  <template #append>
                    <NuxtLink
                      :to="$localePath(`/colors/update/${item.raw.id}`)"
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
            </v-autocomplete>
          </v-col>

          <v-col cols="12" md="4" class="d-flex justify-end align-center">
            <NuxtLink :to="$localePath('/colors/create')">
              <v-btn :prepend-icon="mdiPlus" color="primary">
                {{ $t('create_btn.color') }}
              </v-btn>
            </NuxtLink>
          </v-col>
        </v-row>

        <div class="d-flex mt-4">
          <ActionCancel></ActionCancel>
          <ActionConfirm v-if="productId" :loading="isUpdating">{{
            $t('btn.update')
          }}</ActionConfirm>
          <ActionConfirm v-else :loading="isCreating">{{
            $t('btn.create')
          }}</ActionConfirm>
          <ActionDelete
            v-if="productId"
            @click="executeDelete({ id: productId })"
          ></ActionDelete>
        </div>
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
  DeleteProductDocument,
} from '~/api/generated/types';
import { useRoute } from 'vue-router';
import { CACHE_COLORS } from '~/utils/cache-tags';
import { mdiPencil, mdiPlus } from '@mdi/js';

const route = useRoute();
const productId = ref(route.params.id as string);

const form = reactive({
  sku: '',
  productGroupId: '',
  colorIds: [] as string[],
  createdBy: '',
  updatedBy: undefined as string | undefined,
});

const localePath = useLocalePath();
const {
  data: createData,
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateProductDocument, {
  onData() {
    navigateTo(localePath('/products'));
  },
  clearCacheTags: [CACHE_PRODUCTS],
});
const {
  data: updateData,
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateProductDocument, {
  onData() {
    navigateTo(localePath('/products'));
  },
  clearCacheTags: [CACHE_PRODUCTS, CACHE_PRODUCT],
});
const { execute: executeDelete } = useMutation(DeleteProductDocument, {
  clearCacheTags: [CACHE_PRODUCTS],
  onData() {
    navigateTo(localePath('/products'));
  },
  onError(err) {
    alert(`Error while deleting product -> ${err}`);
  },
});

const handleSubmit = async () => {
  const authStore = useAuthStore();
  const userId = authStore.user?.id ?? '';
  if (productId.value) {
    form.createdBy = userId;
    form.updatedBy = userId;
    await executeUpdate({
      id: productId.value,
      data: form,
    });
  } else {
    form.createdBy = userId;
    await executeCreate({ data: form });
  }
};

const {
  data: colorsData,
  isFetching: isFetchingColors,
  error: colorsError,
} = useQuery({
  query: GetColorsDocument,
  tags: [CACHE_COLORS],
});
const {
  data: productGroupsData,
  isFetching: isFetchingProductGroups,
  error: productGroupsError,
} = useQuery({
  query: GetProductGroupsDocument,
  tags: [CACHE_PRODUCT_GROUPS],
});

const searchQuery = ref('');
const onSearch = (query: string) => {
  searchQuery.value = query;
};
const selectedColors = ref<Color[]>([] as Color[]);
const filteredColors = computed(() => {
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

if (productId.value) {
  useQuery({
    query: GetProductDocument,
    variables: { id: productId.value },
    tags: [CACHE_PRODUCT],
    onData: (data) => {
      const product = data.getProduct;
      form.sku = product.sku;
      form.productGroupId = product.productGroup.id;
      const colorIds = product.productColors.map((productColor) => {
        return productColor.color.id;
      });

      // selectedColors.value = filteredColors.value.filter((color) => {
      //   return colorIds.includes(color.id);
      // });
      const colors = colorIds
        .map((id) => {
          const matched = filteredColors.value.find((color) => {
            return color.id == id;
          });
          return matched ? { ...matched } : null;
        })
        .filter((color): color is Color => color !== null);
      selectedColors.value = colors;
    },
    onError: (error) => {
      alert(`Get Product Error -> ${error}`);
    },
  });
}

watchEffect(() => {
  form.colorIds = selectedColors.value.map((color) => {
    return color.id;
  });
  console.log(JSON.stringify(form));
});
</script>
