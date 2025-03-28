<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="4" class="translucent-background">
      <v-form class="pa-4" @submit.prevent="execute({ data: form })">
        <v-alert v-if="formError" type="error">
          {{ formError }}
        </v-alert>
        <v-text-field v-model="form.sku" label="SKU" />

        <v-autocomplete
          v-model="form.productGroupId"
          label="Product Group"
          :items="productGroupOptions"
          auto-select-first
          item-value="id"
          item-title="concat"
          :loading="isFetchingProductGroups"
        />

        <v-combobox
          v-model="selectedColors"
          :items="colorOptions"
          label="Select Colors"
          multiple
          chips
          @update:search="onSearch"
          :loading="isFetchingColors"
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

        <v-btn @click="discardForm" color="secondary" class="mr-4"
          >Discard</v-btn
        >
        <v-btn :loading="isFetchingForm" type="submit" color="primary"
          >Save</v-btn
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
import { useRouter } from 'vue-router';
import {
  CreateProductDocument,
  GetColorsDocument,
  GetProductGroupsDocument,
  type Color,
  type GetProductGroupsDto,
} from '~/api/generated/types';

const router = useRouter();
const form = reactive({
  sku: '',
  productGroupId: '',
  colorIds: [],
  createdBy: '',
});

const {
  data: createProductData,
  isFetching: isFetchingForm,
  execute,
  error: formError,
} = useMutation(CreateProductDocument, {
  onData() {
    router.push('/products');
  },
});

const selectedColors = ref<Color[]>([]);
const selectedProductGroup = ref('');

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

const remove = (index: number) => {
  if (index > -1) {
    selectedColors.value.splice(index, 1);
  }
};

// The filter mechanism is broken from the library, I'm returning array correctly
const colorOptions = computed(() => {
  if (colorsData.value) {
    // if (searchQuery.value) {
    //   console.log(`getColors: ${JSON.stringify(colorsData.value.getColors)}`);
    //   const returned = colorsData.value.getColors.filter((color) => {
    //     const returnedValue = color.name
    //       .toLowerCase()
    //       .includes(searchQuery.value.toLowerCase());
    //     return returnedValue;
    //   });
    //   console.log(`returned: ${JSON.stringify(returned)}`);
    //   return returned;
    // } else {
    //   console.log(
    //     `returned pure: ${JSON.stringify(colorsData.value.getColors)}`
    //   );
    return colorsData.value.getColors;
    // }
  }
  return [];
});

const searchQuery = ref('');
const onSearch = (query: string) => {
  searchQuery.value = query;
};

const authStore = useAuthStore();
form.createdBy = authStore.user?.id;

const discardForm = () => {
  router.push('/products');
};
watchEffect(() => {
  // if (colorsData.value?.getColors) {
  //   colorOptions.value = colorsData.value.getColors;
  // }

  // if (productGroupsData.value?.getProductGroups) {
  //   productGroupOptions.value = productGroupsData.value.getProductGroups;
  // }

  form.colorIds = selectedColors.value.map((color) => {
    return color.id;
  });
  console.log(JSON.stringify(form));
});
</script>
