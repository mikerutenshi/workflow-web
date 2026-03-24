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
        :label="$t('label.price')"
        v-maska="priceMask"
        v-model="displayModel.price"
        readonly
      />

      <v-text-field
        label="Discount"
        v-maska="percentageMask"
        clearable
        :model-value="displayModel.discount"
        @update:model-value="
          (value) => (displayModel.discount = discMask.unmasked(value))
        "
        inputmode="numeric"
        :error-messages="errors.discount"
      />

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
              <v-text-field
                v-model.number="item.quantity"
                :label="$t('label.quantity')"
                type="number"
                :error-messages="
                  (errors as any)[`invTrfItemSizes[${index}].quantity`]
                "
              />
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

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { Mask } from 'maska';
import { useMutation, useQuery } from 'villus';
import {
  CreateInvTrfItemDocument,
  GetInventoriesDocument,
  type Inventory,
  type InventoryDto,
  type InvProductDto,
} from '~/api/generated/types';
import { InvTrfItemSchema } from '~/validation/schema';

const { t } = useI18n();
const props = defineProps({
  invProductDto: {
    type: Object as PropType<InvProductDto | null>,
    required: true,
  },
});
const availInventories = shallowRef<InventoryDto[]>([]);
const invProduct = props.invProductDto;
// const availProductSizes = invProduct?.invProductSizes.map((item) => {
//   const pendingQty = invProduct!.invTrfItems.reduce(
//     (sum, i) =>
//       sum +
//       i.invTrfItemSizes.reduce(
//         (s, i) => (i.size.id === item.size.id ? s + i.quantity : s),
//         0,
//       ),
//     0,
//   );
//   return {
//     ...item,
//     quantity: item.quantity - pendingQty,
//   };
// });
const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});

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
const displayModel = reactive({
  price: invProduct?.price,
  discount: '',
  sizeAndQties: invProduct!.invProductSizes.map((item) => ({
    id: item.size.id,
    title: item.size.eu,
    quantity: item.quantity,
  })),
});
const discMask = new Mask(percentageMask);
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
const toInvId = useField('toInvId');
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
const {
  execute: executeCreate,
  isFetching: isCreating,
  error: createError,
} = useMutation(CreateInvTrfItemDocument, {
  clearCacheTags: [
    CACHE_INV_TRFS_PER_ITEM,
    CACHE_INV_PRODUCTS,
    CACHE_INV_TRF_ITEMS,
  ],
  onData() {
    snack.message = t('status.saved');
    snack.isVisible = true;
  },
});

const onSubmit = handleSubmit((data) => {
  executeCreate({ data });
});

watch(
  () => displayModel.sizeAndQties,
  (newValues) => {
    newValues.forEach((newItem) => {
      if (newItem.quantity <= 0) {
        newItem.quantity = 0;
      }
      const originalItem = invProduct!.invProductSizes.find(
        (item) => item.size.id === newItem.id,
      );

      if (originalItem) {
        if (newItem.quantity > originalItem.quantity) {
          newItem.quantity = originalItem.quantity;
        }
      }
    });
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
  },
  { immediate: true, deep: true },
);
watch(
  () => displayModel.discount,
  (newDisc) => {
    setFieldValue('discount', convertPercentToDecimal(newDisc));
  },
);
watchEffect(() => {
  const selectedInv = availInventories.value.find(
    (inv) => inv.id === toInvId.value.value,
  );
  const invPrice = calculatePrice(
    invProduct?.product.productGroup.msrp ?? 0,
    selectedInv?.priceFormula?.offset,
    selectedInv?.priceFormula?.multiplier,
    selectedInv?.priceFormula?.discounts,
  );
  displayModel.price = invPrice;
  console.log(`InvPrice: ${invPrice}`);
});

// watchEffect(() => {
//   console.log(`Display Model: ${JSON.stringify(displayModel)}`);
//   console.log(`toInv: ${toInvId.value.value}`);
//   console.log(`Inventories: ${JSON.stringify(availInventories.value)}`);
//   console.log(`Form Values: ${JSON.stringify(values)}`);
// });
</script>
