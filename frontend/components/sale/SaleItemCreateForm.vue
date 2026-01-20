<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-autocomplete
        :label="$t('label.product')"
        auto-select-first
        item-value="productId"
        item-title="product.sku"
        :items="dataInvProducts?.getInvProducts"
        v-model="productId.value.value"
        :error-messages="productId.errorMessage.value"
      >
      </v-autocomplete>

      <v-card class="my-4" variant="outlined">
        <v-card-title>{{ $t('card.fill_quantities') }}</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-text>
          <v-data-table
            :headers="table.headers"
            :items="table.items"
            hide-default-footer
          >
            <template #item.sellQty="{ item, index }">
              <v-text-field
                v-model.number="item.sellQty"
                :label="$t('label.quantity')"
                type="number"
                :error-messages="
                  (errors as any)[`saleItemSizes[${index}].quantity`]
                "
              />
            </template>
            <template #body.append>
              <tr>
                <td></td>
                <td>Total</td>
                <td>
                  <v-text-field
                    v-model.number="totalQty.value.value"
                    label="Total"
                    type="number"
                    :error-messages="totalQty.errorMessage.value"
                    readonly
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
      <ActionConfirm :loading="false">{{ $t('btn.create') }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetInvProductsDocument } from '~/api/generated/types';
import type { ItemSize } from '~/models/size.model';
import { SaleItemSchema } from '~/validation/schema';

interface SizeItem {
  sizeId: string;
  eu: string;
  availQty: number;
  sellQty: number;
}

const { t } = useI18n();
const validationSchema = toTypedSchema(SaleItemSchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema,
  initialValues: {
    saleItemSizes: [],
  },
});
const productId = useField('productId');
const totalQty = useField<number>('totalQty');
const { fields, push, remove, replace } = useFieldArray('saleItemSizes');

const props = defineProps({
  inventoryId: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close-dialog']);
const table = reactive({
  headers: [
    { title: t('label.size'), key: 'eu', sortable: false },
    { title: t('label.quantity'), key: 'availQty', sortable: false },
    { title: 'Selling Qty', key: 'sellQty', sortable: false },
  ] as const,
  items: [] as SizeItem[],
});
const saleStore = useSaleStore();

const {
  execute: executeFetch,
  data: dataInvProducts,
  isFetching: isFetchingInvProducts,
  error: errorInvProducts,
} = useQuery({
  query: GetInvProductsDocument,
  variables: { invId: props.inventoryId ?? '' },
  paused: ({ invId }) => !invId,
  tags: [CACHE_INV_PRODUCTS],
  onData(data) {
    console.log('My Data' + JSON.stringify(data.getInvProducts));
  },
});

watch(
  () => productId.value.value,
  (newId) => {
    console.log(`SelectId = ${newId}`);
    table.items = [];
    dataInvProducts.value?.getInvProducts
      .find((product) => newId === product.productId)
      ?.invProductSizes.map((sizeItem) =>
        table.items.push({
          sizeId: sizeItem.size.id,
          eu: sizeItem.size.eu,
          availQty: sizeItem.quantity,
          sellQty: 0,
        }),
      );
  },
);
watch(
  () => table.items,
  (newItems) => {
    newItems.forEach((item) => {
      if (item.sellQty > item.availQty) {
        item.sellQty = item.availQty;
      } else if (item.sellQty < 0) {
        item.sellQty = 0;
      }
    });

    replace(
      newItems.map((item) => ({
        sizeId: item.sizeId,
        eu: item.eu,
        quantity: item.sellQty,
      })),
    );

    totalQty.value.value = newItems.reduce(
      (sum, size) => size.sellQty + sum,
      0,
    );
  },
  { deep: true },
);

const onSubmit = handleSubmit((data) => {
  if (saleStore.sale) {
    console.log(`SaleStore => ${JSON.stringify(saleStore.sale)}`);
    saleStore.sale.saleItems = saleStore.sale.saleItems.filter(
      (product) => product.productId !== data.productId,
    );
    const saleItemSizes: ItemSize[] = [];
    data.saleItemSizes.forEach((item) => {
      if (item.quantity > 0)
        saleItemSizes.push({
          sizeId: item.sizeId,
          eu: item.eu,
          quantity: item.quantity,
        });
    });
    saleStore.sale.saleItems.push({
      productId: productId.value.value as string,
      saleItemSizes,
      totalQty: data.totalQty,
    });
  }
  emit('close-dialog');
});

watchEffect(() => {
  // console.log(`Table => ${JSON.stringify(table.items)}`);
  // console.log(`Values => ${JSON.stringify(values)}`);
});
</script>
