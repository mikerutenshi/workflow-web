<template>
  <v-form class="h-100 d-flex flex-column" @submit.prevent="onSubmit">
    <v-card-text>
      <v-row v-if="createError || updateError || deleteError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(createError || updateError || deleteError) }}
          </v-alert>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-select
            v-model="productCategoryId.value.value"
            :error-messages="productCategoryId.errorMessage.value"
            :label="$t('label.product_category')"
            item-value="id"
            item-title="name"
            :items="data?.getProductCategories"
            :loading="isFetchingQuery"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="item.name"
                :subtitle="$t(renderGender(item.gender))"
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
          </v-select>
        </v-col>

        <v-col cols="12" lg="3" xl="2" class="d-flex align-center justify-end">
          <v-btn
            :prepend-icon="mdiPlus"
            color="primary"
            variant="tonal"
            @click="dialogForm = true"
            >{{ $t('btn.product_category') }}</v-btn
          >
        </v-col>
      </v-row>

      <v-text-field
        v-model="skuNumeric.value.value"
        :error-messages="skuNumeric.errorMessage.value"
        :label="$t('label.sku_numeric')"
      />

      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        :label="$t('label.product_name')"
      />

      <v-text-field
        :label="$t('label.msrp')"
        v-maska="priceMask"
        @update:model-value="
          (value) => msrp.setValue(cleanRupiahToNumber(value))
        "
        :model-value="msrp.value.value"
        inputmode="number"
        clearable
        :error-messages="msrp.errorMessage.value"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionDelete
        :loading="isDeleting"
        v-if="productGroupId"
        @click="executeDelete({ id: productGroupId })"
      ></ActionDelete>
      <ActionConfirm v-if="productGroupId" :loading="isUpdating">{{
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
        ? $t('page.product_category_edit')
        : $t('page.product_category_create')
    "
    v-model="dialogForm"
  >
    <ProductCategoryCreateForm
      @form-submit="handleDialogClose"
      :product-category-id="selectionId"
    ></ProductCategoryCreateForm>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { mdiPencil, mdiPlus } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import { useRoute } from 'vue-router';
import {
  CreateProductGroupDocument,
  DeleteProductGroupDocument,
  GetProductCategoriesDocument,
  GetProductGroupDocument,
  UpdateProductGroupDocument,
} from '~/api/generated/types';
import { ProductGroupSchema } from '~/validation/schema';

const { t } = useI18n();
const route = useRoute();
const props = defineProps({
  productGroupId: {
    type: String,
  },
});
const productGroupId = (route.params.id as string) || props.productGroupId;
const emit = defineEmits(['form-submit']);
const dialogForm = ref(false);
const selectionId = ref('');

const authStore = useAuthStore();
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
const msrp = useField('msrp');

const snack = useSnackbarStore();
const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreateProductGroupDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_PRODUCT_GROUPS],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateProductGroupDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_PRODUCT_GROUPS, CACHE_PRODUCT_GROUP, CACHE_PRODUCTS],
});
const {
  execute: executeFetchProductCategory,
  data,
  error: queryError,
  isFetching: isFetchingQuery,
} = useQuery({
  query: GetProductCategoriesDocument,
  tags: [CACHE_PRODUCT_CATEGORIES],
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: deleteError,
} = useMutation(DeleteProductGroupDocument, {
  refetchTags: [CACHE_PRODUCT_GROUPS],
  onData(data) {
    if (data.deleteProductGroup) {
      emit('form-submit');
      snack.show(t('status.deleted'), SnackColor.Success);
    }
  },
});
const onSubmit = handleSubmit((data) => {
  if (productGroupId) {
    executeUpdate({
      id: productGroupId,
      data: { updatedBy: data.updatedBy!, ...data },
    });
  } else {
    executeCreate({ data });
  }
});

if (productGroupId) {
  useQuery({
    query: GetProductGroupDocument,
    variables: { id: productGroupId },
    onData(data) {
      const pg = data.getProductGroup;
      setValues({
        skuNumeric: pg.skuNumeric,
        name: pg.name,
        productCategoryId: pg.productCategory.id,
        msrp: pg.msrp,
        updatedBy: userId,
      });
    },
    onError(err) {
      alert(`Get Product Group  Error -> ${err}`);
    },
    tags: [CACHE_PRODUCT_GROUP],
  });
}

function showDialogWithId(id: string) {
  dialogForm.value = true;
  selectionId.value = id;
}
function handleDialogClose() {
  if (dialogForm) dialogForm.value = false;
  selectionId.value = '';
  executeFetchProductCategory();
  if (productCategoryId) productCategoryId.setValue(undefined);
}
</script>
