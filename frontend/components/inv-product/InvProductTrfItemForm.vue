<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row v-if="createError">
          <v-col>
            <v-alert type="error">
              {{ extractGraphQlError(createError) }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete
              label="To Inventory"
              auto-select-first
              item-value="id"
              item-title="name"
              :items="availInventories"
              :loading="isFetchingInventories"
              v-model="toInvId.value.value"
              :error-messages="toInvId.errorMessage.value"
            >
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
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
                      :error-messages="
                        (errors as any)[`invTrfItemSizes[${index}].quantity`]
                      "
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
      <ActionConfirm :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-row>
  </v-form>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import {
  CreateInvTrfItemDocument,
  GetInventoriesDocument,
  type Inventory,
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
const availInventories = shallowRef<Inventory[]>([]);
const invProduct = props.invProductDto;
const availProductSizes = invProduct?.invProductSizes.map((item) => {
  const pendingQty = invProduct!.invTrfItems.reduce(
    (sum, i) =>
      sum +
      i.invTrfItemSizes.reduce(
        (s, q) => (q.size.id === item.size.id ? s + q.quantity : s),
        0,
      ),
    0,
  );
  return {
    ...item,
    quantity: item.quantity - pendingQty,
  };
});
const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});

const sizeHeaders = ref([
  { title: t('label.size'), key: 'title', sortable: false },
  { title: t('label.quantity'), key: 'quantity', sortable: false },
]);
const sizeQuantities = reactive<
  Array<{ id: string; title: string; quantity: number }>
>(
  availProductSizes!.map((item) => {
    return {
      id: item.size.id,
      title: item.size.eu,
      quantity: item.quantity,
    };
  }),
);

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
  clearCacheTags: [CACHE_INV_TRFS_PER_ITEM],
  onData() {
    snack.message = t('status.saved');
    snack.isVisible = true;
  },
});

const onSubmit = handleSubmit((data) => {
  executeCreate({ data });
});

watch(
  sizeQuantities,
  (newValues) => {
    newValues.forEach((newItem) => {
      if (newItem.quantity <= 0) {
        newItem.quantity = 0;
      }
      const originalItem = availProductSizes!.find(
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
  { immediate: true },
);

// watchEffect(() => {
//   console.log(`size quantities: ${JSON.stringify(sizeQuantities)}`);
//   console.log(`form values: ${JSON.stringify(values)}`);
// });
</script>
