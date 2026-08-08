<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(createError) }}
          </v-alert>
        </v-col>
      </v-row>

      <v-autocomplete
        :label="$t('label.to_inv')"
        auto-select-first
        item-value="id"
        item-title="name"
        :items="availInventories"
        :loading="isFetchingInventories"
        v-model="toInvId.value.value"
        :error-messages="toInvId.errorMessage.value"
      >
      </v-autocomplete>

      <v-text-field
        v-if="toInvId.value.value"
        :label="$t('label.price')"
        v-maska="priceMask"
        v-model="displayModel.price"
        readonly
      />

      <v-row v-if="toInvId.value.value">
        <v-col cols="9">
          <v-text-field
            v-for="(_, index) in displayModel.discounts"
            :label="`${$t('label.discount')} ${index + 1}`"
            v-maska="percentageMask"
            :key="index"
            clearable
            :model-value="displayModel.discounts[index]"
            @update:model-value="
              (value) =>
                (displayModel.discounts[index] = discMask.unmasked(value))
            "
            @click:clear="
              if (discounts.fields.value.length > 1)
                displayModel.discounts.pop();
            "
            inputmode="numeric"
            :error-messages="errors['discounts']"
          />
        </v-col>
        <v-col cols="3" class="d-flex justify-end align-center">
          <v-btn
            :icon="mdiPlus"
            color="primary"
            @click="displayModel.discounts.push('')"
          ></v-btn>
        </v-col>
      </v-row>

      <v-card class="mb-4" variant="outlined">
        <v-card-title>{{ $t('card.fill_quantities') }}</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-text>
          <v-data-table
            :headers="tableHeaders"
            :items="displayModel.sizeAndQties"
            editable
            hide-default-footer
          >
            <template #item.quantity="{ item, index }">
              <v-number-input
                v-model="item.quantity"
                :label="$t('label.quantity')"
                :error-messages="
                  (errors as any)[`invTrfItemSizes[${index}].quantity`]
                "
                :min="0"
                :max="clonedSizeQties[index]?.quantity"
              />
            </template>
            <template #body.append>
              <tr>
                <td>Total</td>
                <td>
                  <v-number-input
                    v-model="totalQty.value.value"
                    label="Total"
                    :error-messages="totalQty.errorMessage.value"
                    readonly
                    control-variant="hidden"
                    color="primary"
                  />
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { mdiPlus } from '@mdi/js';
import { Mask } from 'maska';
import { useMutation, useQuery } from 'villus';
import {
  CreateInvTrfItemDocument,
  GetInventoriesDocument,
  GetInvProductPriceDocument,
  type InventoryDto,
  type InvProductDto,
} from '~/api/generated/types';
import { InvTrfItemSchema } from '~/validation/schema';

const { t } = useI18n();
const props = defineProps({
  invProductDto: {
    type: [Object, null] as PropType<InvProductDto | null>,
    required: true,
  },
});
const availInventories = shallowRef<InventoryDto[]>([]);
const invProduct = props.invProductDto;
const emit = defineEmits(['form-submit']);

const tableHeaders = ref([
  { title: t('label.size'), key: 'title', sortable: false },
  { title: t('label.quantity'), key: 'quantity', sortable: false },
]);
const sizeQuantities = reactive<
  Array<{ id: string; title: string; quantity: number }>
>(
  invProduct!.invProductSizes.map((item) => {
    return {
      id: item.size.id,
      title: item.size.eu,
      quantity: item.quantity,
    };
  }),
);
const priceModel = ref(invProduct?.price);

const authStore = useAuthStore();
const userId = authStore.user?.id || '';

const validationSchema = toTypedSchema(InvTrfItemSchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema,
  initialValues: {
    fromInvId: invProduct?.invId,
    productId: invProduct?.productId,
    createdBy: userId,
  },
});
const toInvId = useField<string>('toInvId');
const productId = useField<string>('productId');
const discounts = useFieldArray<string>('discounts');
const totalQty = useField<number>('totalQty');
const { fields, push, remove, replace } = useFieldArray('invTrfItemSizes');

const { isFetching: isFetchingInventories, error: errorInventories } = useQuery(
  {
    query: GetInventoriesDocument,
    tags: [CACHE_INVENTORIES],
    onData(data) {
      const inventories = data.getInventories;
      const shownInventories = inventories.filter(
        (item) => item.id !== invProduct?.invId,
      );
      availInventories.value = shownInventories;
    },
  },
);
const snack = useSnackbarStore();
const {
  execute: executeCreate,
  isFetching: isCreating,
  error: createError,
} = useMutation(CreateInvTrfItemDocument, {
  refetchTags: [
    CACHE_INV_TRFS_PER_ITEM,
    CACHE_INV_PRODUCTS,
    CACHE_INV_TRF_ITEMS,
  ],
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
});

const priceVariables = reactive({
  invId: '',
  productId: productId.value.value,
  discounts: <string[]>[],
});
const {
  execute: executeGetPrice,
  isFetching: isFetchingPrice,
  error: errorPrice,
  data: dataPrice,
} = useQuery({
  query: GetInvProductPriceDocument,
  variables: priceVariables,
  cachePolicy: 'network-only',
  fetchOnMount: false,
});

const displayModel = reactive({
  price: computed(() => dataPrice.value?.getInvProductPrice),
  discounts:
    props.invProductDto?.discounts && props.invProductDto.discounts.length > 0
      ? props.invProductDto.discounts.map((disc) =>
          convertDecimalToPercent(disc),
        )
      : [''],
  sizeAndQties: invProduct!.invProductSizes.map((item) => ({
    id: item.size.id,
    title: item.size.eu,
    quantity: item.quantity,
  })),
});
const { cloned: clonedSizeQties } = useCloned(displayModel.sizeAndQties);
const discMask = new Mask(percentageMask);
// const discsDisplay = ref(['']);

const onSubmit = handleSubmit((data) => {
  const { totalQty, ...rest } = data;
  executeCreate({ data: rest });
});

watch(
  () => displayModel.sizeAndQties,
  (newValues) => {
    replace(
      newValues
        .filter((item) => item.quantity > 0)
        .map((item) => {
          return {
            sizeId: item.id,
            quantity: item.quantity,
          };
        }),
    );
    totalQty.value.value = newValues.reduce(
      (sum, size) => size.quantity + sum,
      0,
    );
  },
  { immediate: true, deep: true },
);

watchDebounced(
  displayModel.discounts,
  (newArray) => {
    const decimals = newArray
      .filter((item) => item !== '')
      .map((item) => convertPercentToDecimal(item));
    setFieldValue('discounts', decimals);
  },
  { debounce: 500, immediate: true },
);

watchEffect(() => {
  if (toInvId.value.value) {
    priceVariables.invId = toInvId.value.value;
    priceVariables.discounts = discounts.fields.value.map((f) => f.value);
  }
});
</script>
