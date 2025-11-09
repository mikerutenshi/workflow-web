<template>
  <v-form class="h-100 d-flex flex-column" @submit.prevent="onSubmit">
    <v-row>
      <v-col>
        <v-row v-if="createError || updateError || deleteError">
          <v-col>
            <v-alert type="error">
              {{
                extractGraphQlError(createError || updateError || deleteError)
              }}
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
                  :title="item.raw.name"
                  :subtitle="$t(renderGender(item.raw.gender))"
                >
                  <template #append>
                    <v-btn
                      color="primary"
                      :icon="mdiPencil"
                      size="small"
                      variant="text"
                      @click="showDialogWithId(item.value)"
                    ></v-btn>
                  </template>
                </v-list-item>
              </template>
            </v-select>
          </v-col>

          <v-col cols="12" md="4" class="d-flex align-center justify-end">
            <v-btn
              :prepend-icon="mdiPlus"
              color="primary"
              @click="dialogForm = true"
              >{{ $t('create_btn.product_category') }}</v-btn
            >
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

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnack>

  <ActionEditItemDialog
    :dialogTitle="
      selectionId
        ? $t('page.product_category_edit')
        : $t('page.product_category_create')
    "
    v-model="dialogForm"
  >
    <ProductCategoryCreateForm
      @close-dialog="handleDialogClose"
      :product-category-id="selectionId"
    ></ProductCategoryCreateForm>
  </ActionEditItemDialog>
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

const { t } = useI18n();
const route = useRoute();
const props = defineProps({
  productGroupId: {
    type: String,
  },
});
const productGroupId = (route.params.id as string) || props.productGroupId;
const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const dialogForm = ref(false);
const selectionId = ref('');

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
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_PRODUCT_GROUPS],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateProductGroupDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_PRODUCT_GROUPS, CACHE_PRODUCT_GROUP],
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
  clearCacheTags: [CACHE_PRODUCT_GROUPS],
  onData(data) {
    if (data.deleteProductGroup) {
      snack.message = `${t('status.deleted')}`;
    } else {
      snack.color = SnackColor.Error;
      snack.message = `${t('status.failed')}`;
    }
    snack.isVisible = true;
  },
});
const onSubmit = handleSubmit((data) => {
  if (productGroupId) {
    executeUpdate({ id: productGroupId, data });
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

// function goPrevious() {
//   router.go(-1);
// }

// watchEffect(() => {
//   console.log(JSON.stringify(values));
// });
</script>
