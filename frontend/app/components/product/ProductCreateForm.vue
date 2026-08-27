<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="errorCreate || errorUpdate || errorDelete" type="error">
        <v-col>
          <v-alert type="error">
            {{
              extractGraphQlError(errorCreate) ||
              extractGraphQlError(errorUpdate) ||
              extractGraphQlError(errorDelete)
            }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-autocomplete
            v-model="productGroupId.value.value"
            :label="$t('label.product_group')"
            auto-select-first
            item-value="id"
            item-title="skuNumeric"
            :items="productGroupsData?.getProductGroups"
            :loading="isFetchingProductGroups"
            :error-messages="productGroupId.errorMessage.value"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="item.skuNumeric"
                :subtitle="
                  [
                    item.productCategory.name,
                    $t(renderGender(item.productCategory.gender)),
                    item.name,
                  ]
                    .filter(Boolean)
                    .join(' | ')
                "
              >
                <template #append>
                  <v-btn
                    color="primary"
                    :icon="mdiPencil"
                    size="small"
                    variant="text"
                    @click="showDialogWithId(item.id)"
                  ></v-btn>
                </template>
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="12" lg="3" xl="2" class="d-flex justify-end align-center">
          <v-btn
            :prepend-icon="mdiPlus"
            color="primary"
            variant="tonal"
            @click="dialogForm = true"
            >{{ $t('btn.product_group') }}</v-btn
          >
        </v-col>
      </v-row>

      <v-text-field
        v-model="sku.value.value"
        :label="$t('label.sku')"
        :error-messages="
          sku.errorMessage.value?.includes('regex')
            ? $t('error.sku_format_detail')
            : sku.errorMessage.value
        "
      />

      <v-autocomplete
        v-for="(_, index) in colorSelections"
        :key="index"
        v-model="colorSelections[index]"
        :label="`${$t('label.select_colors')} ${index + 1}`"
        chips
        :loading="isFetchingColors"
        :items="sortedColors"
        item-title="name"
        item-value="id"
        return-object
        :error-messages="colorIds.errorMessage.value"
        clearable
        auto-select-first
      >
        <template #item="{ item, props }">
          <v-list-item v-bind="props" :title="item.name">
            <template #prepend>
              <div
                class="color-box"
                :style="{ backgroundColor: item.hexCode }"
              />
            </template>
          </v-list-item>
        </template>

        <template #chip="{ item }">
          <v-chip v-if="item.id">
            <template #prepend>
              <div
                :style="{ backgroundColor: item.hexCode }"
                class="color-box"
              ></div>
            </template>
            <span>{{ item.name }}</span>
          </v-chip>
        </template>
      </v-autocomplete>
      <v-btn
        :prepend-icon="mdiPlus"
        color="primary"
        variant="tonal"
        @click="colorSelections.push(placeholderColor)"
        >{{ $t('btn.add_color') }}</v-btn
      >
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionDelete
        v-if="productId"
        :loading="isDeleting"
        @click="executeDelete({ id: productId })"
      ></ActionDelete>
      <ActionConfirm v-if="productId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>

  <ActionEditItemDialog
    :dialogTitle="
      selectionId
        ? $t('page.product_group_edit')
        : $t('page.product_group_create')
    "
    v-model="dialogForm"
  >
    <ProductGroupCreateForm
      @form-submit="handleDialogClose"
      :product-group-id="selectionId"
    ></ProductGroupCreateForm>
  </ActionEditItemDialog>
</template>

<style scoped>
.v-select .v-chip {
  pointer-events: none;
}
</style>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { mdiPencil, mdiPlus } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import { useRoute } from 'vue-router';
import {
  CreateProductDocument,
  DeleteProductDocument,
  GetColorsDocument,
  GetProductDocument,
  GetProductGroupsDocument,
  UpdateProductDocument,
  type Color,
} from '~/api/generated/types';
import { CACHE_COLORS } from '~/utils/cache-tags';
import { ProductSchema } from '~/validation/schema';

const { t } = useI18n();
const authStore = useAuthStore();

const route = useRoute();
const props = defineProps({
  productId: {
    type: String,
  },
});
const productId = (route.params.id as string) || props.productId;
const emit = defineEmits(['form-submit']);
const dialogForm = ref(false);
const selectionId = ref('');

const validationSchema = toTypedSchema(ProductSchema);
const { handleSubmit, values, setValues, setFieldValue } = useForm({
  validationSchema,
});
const productGroupId = useField('productGroupId');
const colorIds = useField('colorIds');
const sku = useField('sku');
// const msrp = useField('msrp');
// const msrpUnmasked = ref('');
// const msrpMasked = ref('');
// defineExpose({ msrpUnmasked });

const snack = useSnackbarStore();
const {
  isFetching: isCreating,
  execute: executeCreate,
  error: errorCreate,
} = useMutation(CreateProductDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_PRODUCTS],
});
const {
  isFetching: isUpdating,
  execute: executeUpdate,
  error: errorUpdate,
} = useMutation(UpdateProductDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_PRODUCTS, CACHE_PRODUCT],
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: errorDelete,
} = useMutation(DeleteProductDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData(data) {
    if (data.deleteProduct) {
      emit('form-submit');
      snack.show(t('status.deleted'), SnackColor.Success);
    }
  },
});

const onSubmit = handleSubmit((data) => {
  if (!productId) {
    executeCreate({ data });
  } else {
    executeUpdate({
      id: productId,
      data,
    });
  }
});

const {
  data: colorsData,
  isFetching: isFetchingColors,
  error: colorsError,
} = useQuery({
  query: GetColorsDocument,
  tags: [CACHE_COLORS],
});
const sortedColors = computed(() => {
  if (!colorsData.value?.getColors) return [];
  return [...colorsData.value.getColors].sort((a, b) =>
    a.name.localeCompare(b.name),
  );
});
const {
  data: productGroupsData,
  isFetching: isFetchingProductGroups,
  error: productGroupsError,
  execute: executeFetchProductGroups,
} = useQuery({
  query: GetProductGroupsDocument,
  tags: [CACHE_PRODUCT_GROUPS],
});

const placeholderColor = {
  id: '',
  name: '',
  hexCode: '',
} as Color;
const colorSelections = ref<Color[]>([placeholderColor]);

const remove = (index: number) => {
  if (index > -1) {
    colorSelections.value.splice(index, 1);
  }
};

if (productId) {
  useQuery({
    query: GetProductDocument,
    variables: { id: productId },
    tags: [CACHE_PRODUCT],
    onData: (data) => {
      const product = data.getProduct;
      setValues({
        sku: product.sku,
        productGroupId: product.productGroup.id,
      });
      // msrpMasked.value = product.productGroup.msrp?.toString() ?? '';
      const ids = product.productColors.map((productColor) => {
        return productColor.color.id;
      });

      const colors = ids
        .map((id) => {
          const matched = sortedColors.value.find((color) => {
            return color.id == id;
          });
          return matched ? { ...matched } : null;
        })
        .filter((color): color is Color => color !== null);
      colorSelections.value = colors;
    },
    onError: (error) => {
      alert(`Get Product Error -> ${error}`);
    },
  });
}

function showDialogWithId(id: string) {
  dialogForm.value = true;
  selectionId.value = id;
}
function handleDialogClose() {
  if (dialogForm) dialogForm.value = false;
  selectionId.value = '';
  if (productGroupId) productGroupId.setValue(undefined);
}

watch(
  () => colorSelections.value,
  (newColors) => {
    const colorIds = newColors
      .filter((color) => color && color.id !== '')
      .map((color) => color.id);
    setFieldValue('colorIds', colorIds);
  },
  { deep: true, immediate: true },
);

watch(dialogForm, (newState) => {
  if (!newState) {
    handleDialogClose();
  }
});
</script>
