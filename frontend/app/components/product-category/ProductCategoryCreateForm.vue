<template>
  <v-form class="h-100 d-flex flex-column" @submit.prevent="onSubmit">
    <v-row v-if="createError || updateError || deleteError">
      <v-col>
        <v-alert type="error">
          {{ extractGraphQlError(createError || updateError || deleteError) }}
        </v-alert>
      </v-col>
    </v-row>

    <v-card-text>
      <v-text-field
        v-model="name.value.value"
        :label="$t('label.name')"
        :error-messages="name.errorMessage.value"
      />

      <v-select
        v-model="gender.value.value"
        :label="$t('label.gender')"
        item-value="id"
        item-title="name"
        :items="genders"
        :error-messages="gender.errorMessage.value"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :title="item !== '' ? $t(renderGender(item as Gender)) : ''"
          ></v-list-item>
        </template>
        <template v-slot:selection="{ item }">
          <span>{{ item !== '' ? $t(renderGender(item as Gender)) : '' }}</span>
        </template>
      </v-select>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionDelete
        v-if="productCategoryId"
        :loading="isDeleting"
        @click="executeDelete({ id: productCategoryId })"
      ></ActionDelete>
      <ActionConfirm v-if="productCategoryId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @on-confirm="emit('close-dialog')"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { ProductCategorySchema } from '~/validation/schema';
import { useMutation, useQuery } from 'villus';
import { useRoute, useRouter } from 'vue-router';
import {
  CreatePrdouctCategoryDocument,
  DeleteProductCategoryDocument,
  Gender,
  GetProductCategoryDocument,
  UpdateProductCategoryDocument,
} from '~/api/generated/types';

const { t } = useI18n();
const route = useRoute();
const props = defineProps({
  productCategoryId: {
    type: String,
  },
});
const productCategoryId =
  (route.params.id as string) || props.productCategoryId;
const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});

const router = useRouter();
// const form = reactive({
//   name: '',
//   gender: '',
// });
const validationSchema = toTypedSchema(ProductCategorySchema);
const { handleSubmit, setValues, values } = useForm({ validationSchema });
const name = useField('name');
const gender = useField<'MEN' | 'WOMEN' | 'KIDS'>('gender');
const genders = ref(['MEN', 'WOMEN', 'KIDS']);
const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreatePrdouctCategoryDocument, {
  onData() {
    snack.isVisible = true;
  },
  refetchTags: [CACHE_PRODUCT_CATEGORIES],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateProductCategoryDocument, {
  onData() {
    snack.isVisible = true;
  },
  refetchTags: [CACHE_PRODUCT_CATEGORIES, CACHE_PRODUCT_CATEGORY],
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: deleteError,
} = useMutation(DeleteProductCategoryDocument, {
  refetchTags: [CACHE_PRODUCT_CATEGORIES],
  onData(data) {
    if (data.deleteProductCategory) {
      snack.message = `${t('status.deleted')}`;
    } else {
      snack.color = SnackColor.Error;
      snack.message = `${t('status.failed')}`;
    }
    snack.isVisible = true;
  },
});
const onSubmit = handleSubmit((data) => {
  if (productCategoryId) {
    executeUpdate({ id: productCategoryId, data });
  } else {
    executeCreate({ data });
  }
});

// const goPrevious = () => {
//   router.go(-1);
// };

if (productCategoryId) {
  useQuery({
    query: GetProductCategoryDocument,
    variables: { id: productCategoryId },
    onData(data) {
      const category = data.getProductCategory;
      setValues({
        name: category.name,
        gender: category.gender,
      });
    },
    onError(err) {
      alert(`Get Product Category  Error -> ${err}`);
    },
    tags: [CACHE_PRODUCT_CATEGORY],
  });
}
// watchEffect(() => {
//   console.log(JSON.stringify(values));
// });
</script>
