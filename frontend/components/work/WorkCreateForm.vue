<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row v-if="updateError || createError || deleteError">
          <v-col>
            <v-alert type="error">
              {{
                extractGraphQlError(updateError || createError || deleteError)
              }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <ActionPickDate
              v-model="date.value.value"
              :error-messages="date.errorMessage.value"
            ></ActionPickDate>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              :label="$t('label.order_no')"
              v-model="orderNo.value.value"
              :error-messages="orderNo.errorMessage.value"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete
              :label="$t('label.product')"
              auto-select-first
              item-value="id"
              item-title="sku"
              :items="productsData?.getProducts"
              :loading="isFetchingProducts"
              v-model="productId.value.value"
              :error-messages="productId.errorMessage.value"
            >
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              :label="$t('label.select_sizes')"
              multiple
              chips
              auto-select-first
              :items="computeSizeList"
              :loading="isFetchingSizes"
              item-title="eu"
              item-value="id"
              v-model="sizes"
              return-object
              :error-messages="errors[`sizes`]"
              :disabled="isSizesDisabled"
            >
              <!-- <template #item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="`${item.raw.eu} | ${item.raw.us} | ${item.raw.uk}`"
            ></v-list-item>
          </template> -->
            </v-select>
          </v-col>
        </v-row>

        <v-row v-if="isShowSizeQuantities">
          <v-col>
            <v-card>
              <v-card-title></v-card-title>
              <v-card-subtitle>{{
                $t('card.fill_quantities')
              }}</v-card-subtitle>
              <v-card-text>
                <v-data-table
                  :headers="sizeHeaders"
                  :items="sizeQuantities"
                  editable
                  hide-default-footer
                >
                  <template #item.quantity="{ item, index }">
                    <v-text-field
                      v-model.number="item.quantity"
                      :label="$t('label.quantity')"
                      type="number"
                      :error-messages="(errors as any)[`sizes[${index}].quantity`]"
                    />
                  </template>
                </v-data-table>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="end" class="ma-1 mt-4">
      <ActionConfirm :loading="isCreating || isUpdating">{{
        submitBtnTitle
      }}</ActionConfirm>
      <ActionDelete
        v-if="workId"
        :loading="isDeleting"
        @click="executeDelete({ id: workId })"
      ></ActionDelete>
    </v-row>
  </v-form>

  <ActionShowSnackbarSuccess
    v-model="snackbar"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnackbarSuccess>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useRoute, useRouter } from 'vue-router';
import {
  CreateWorkDocument,
  DeleteWorkDocument,
  Gender,
  GetProductsDocument,
  GetSizesDocument,
  GetWorkDocument,
  UpdateWorkDocument,
  type Size,
} from '~/api/generated/types';
import { WorkSchema } from '~/validation/schema';

const props = defineProps({
  workId: {
    type: String,
  },
});
const emit = defineEmits(['close-dialog']);

const route = useRoute();
const workId = ref((route.params.id as string) || props.workId);

const { data: productsData, isFetching: isFetchingProducts } = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});
const { data: sizesData, isFetching: isFetchingSizes } = useQuery({
  query: GetSizesDocument,
  tags: [CACHE_SIZES],
});

const computeSizeList = computed(() => {
  const product = productsData.value?.getProducts.find(
    (product) => product.id === productId.value.value
  );
  const gender = product?.productGroup.productCategory.gender;
  return gender == Gender.Men || gender == Gender.Women
    ? sizesData.value?.getSizes.filter((size) => size.gender == gender)
    : sizesData.value?.getSizes;
});

const router = useRouter();
const submitBtnTitle = computed(() =>
  workId.value ? t('btn.update') : t('btn.create')
);

const snackbar = ref(false);
const {
  execute: executeCreate,
  isFetching: isCreating,
  error: createError,
} = useMutation(CreateWorkDocument, {
  clearCacheTags: [CACHE_WORKS],
  onData() {
    snackbar.value = true;
    // router.back();
  },
});
const {
  execute: executeUpdate,
  isFetching: isUpdating,
  error: updateError,
} = useMutation(UpdateWorkDocument, {
  clearCacheTags: [CACHE_WORK, CACHE_WORKS],
  onData() {
    snackbar.value = true;
    // router.back();
  },
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: deleteError,
} = useMutation(DeleteWorkDocument, {
  clearCacheTags: [CACHE_WORKS],
  onData(data) {
    snackbar.value = true;
    // router.back();
  },
});

const authStore = useAuthStore();
const userId = authStore.user?.id || '';

const validationSchema = toTypedSchema(WorkSchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema,
  initialValues: {
    date: dayjs().toISOString(),
    orderNo: new Date().toISOString().slice(0, 10).replace(/-/g, ''),
    createdBy: userId,
    sizes: [],
  },
});
const date = useField<string>('date');
const orderNo = useField('orderNo');
const productId = useField('productId');
const { fields, push, remove, replace } = useFieldArray('sizes');

const isShowSizeQuantities = ref(false);
const isSizesDisabled = ref(true);

const sizes = ref<Size[]>([]);
const sizeQuantities = reactive<
  Array<{ id: string; title: string; quantity: number }>
>([]);
const { t } = useI18n();
const sizeHeaders = ref([
  { title: t('label.size'), key: 'title', sortable: false },
  { title: t('label.quantity'), key: 'quantity', sortable: false },
]);

const onSubmit = handleSubmit((data) => {
  if (!workId.value) {
    executeCreate({ data });
  } else {
    executeUpdate({ id: workId.value, data: { ...data, updatedBy: userId } });
  }
});

if (workId.value) {
  useQuery({
    query: GetWorkDocument,
    variables: { id: workId.value },
    tags: [CACHE_WORK],
    onData(data) {
      const work = data.getWork;
      setValues({
        date: work.date,
        orderNo: work.orderNo,
        productId: work.productId,
        updatedBy: userId,
      });
      sizes.value = work.sizes.map((item) => ({
        id: item.size.id,
        eu: item.size.eu,
        gender: item.size.gender,
        jp: item.size.jp,
        uk: item.size.uk,
        us: item.size.us,
      }));
      work.sizes.forEach((item) => {
        const sizeInTable = sizeQuantities.find(
          (size) => size.id === item.size.id
        );
        if (sizeInTable) {
          sizeInTable.quantity = item.quantity;
        } else {
          sizeQuantities.push({
            id: item.size.id,
            title: item.size.eu,
            quantity: item.quantity,
          });
        }
      });
    },
  });
}

watch(
  productId.value,
  (newId, oldId) => {
    console.log(`NewId: ${newId}`);
    console.log(`OldId: ${oldId}`);
    if (newId && oldId === undefined) {
      isSizesDisabled.value = false;
    } else if ((newId && oldId) || (newId && oldId == null)) {
      isSizesDisabled.value = false;
      sizes.value = [];
    } else {
      isSizesDisabled.value = true;
    }
  },
  { immediate: true }
);

watch(sizes, (newSizes) => {
  isShowSizeQuantities.value = newSizes.length > 0;

  sizeQuantities.splice(
    0,
    sizeQuantities.length,
    ...newSizes.map((item) => {
      const existing = sizeQuantities.find((i) => i.id === item.id);
      return {
        id: item.id,
        title: item.eu,
        quantity: existing ? existing.quantity : 1,
      };
    })
  );
});

watch(sizeQuantities, (newItems) => {
  replace(
    newItems.map((newItem) => ({
      id: newItem.id,
      quantity: newItem.quantity,
    }))
  );
});

watchEffect(() => {
  //   sizesTable.splice(
  //     0,
  //     sizesTable.length,
  //     ...sizes.value.map((size) => {
  //       const existing = sizesTable.find((item) => item.id === size.id);
  //       return {
  //         id: size.id,
  //         title: size.eu,
  //         quantity: existing ? existing.quantity : 0,
  //       };
  //     })
  //   );

  console.log(`Form -> ${JSON.stringify(values)}`);
});
</script>
