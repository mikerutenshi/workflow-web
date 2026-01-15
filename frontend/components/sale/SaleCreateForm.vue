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
      <ActionPickDate
        v-model="date.value.value"
        :error-messages="date.errorMessage.value"
      ></ActionPickDate>

      <v-text-field
        :label="$t('label.sale_no')"
        :error-messages="saleNo.errorMessage.value"
        v-model="saleNo.value.value"
      />

      <v-col class="d-flex align-center justify-end">
        <v-btn
          :prepend-icon="mdiPlus"
          color="primary"
          @click="dialog.isVisible = true"
          >{{ 'Add Shoe' }}</v-btn
        >
      </v-col>

      <v-card variant="outlined" class="my-4">
        <v-card-title>{{ 'Shopping Cart' }}</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-text>
          <v-data-table
            :headers="table.headers"
            :items="displayInvProducts"
            v-model="table.productIds"
            item-value="productId"
            hide-default-footer
          >
            <template v-slot:item.product.productColors="{ item }">
              <div style="display: flex; flex-wrap: wrap; gap: 8px">
                <template v-for="color in item.product.productColors">
                  <v-chip class="d-flex align-center">
                    <div
                      class="color-box"
                      :style="{ backgroundColor: color.color.hexCode }"
                    />
                    <span>{{ color.color.name }}</span>
                  </v-chip>
                </template>
              </div>
            </template>
            <template
              v-slot:item.product.productGroup.productCategory.gender="{ item }"
            >
              {{
                $t(
                  renderGender(
                    item.product.productGroup.productCategory.gender,
                  ),
                )
              }}
            </template>
            <template v-slot:item.price="{ item }">
              {{ formatRupiah(item.price) }}
            </template>
            <template v-slot:item.subtotal="{ item }">
              {{ formatRupiah(item.subtotal) }}
            </template>

            <template v-slot:item.saleItemSizes="{ item }">
              <v-table density="compact">
                <tbody>
                  <tr
                    v-for="itemSize in item.saleItemSizes"
                    :key="itemSize.sizeId"
                  >
                    <td>{{ itemSize.eu }}</td>
                    <td>{{ itemSize.quantity }}</td>
                  </tr>
                </tbody>
              </v-table>
            </template>

            <template #body.append>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>Total</td>
                <td>
                  {{
                    formatRupiah(
                      displayInvProducts.reduce(
                        (sum, product) => product.subtotal + sum,
                        0,
                      ),
                    )
                  }}
                </td>
              </tr>
              <tr v-if="errors['saleItems']" class="text-error">
                {{
                  errors['saleItems']
                }}
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

  <ActionEditItemDialog :dialogTitle="dialog.title" v-model="dialog.isVisible">
    <SaleItemCreateForm
      :inventory-id="inventoryId"
      @close-dialog="closeDialog"
    ></SaleItemCreateForm>
  </ActionEditItemDialog>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { mdiPlus } from '@mdi/js';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useTheme } from 'vuetify';
import {
  CreateSaleDocument,
  GenerateSaleNoDocument,
  GetInvProductsDocument,
  GetSaleDocument,
  Progress,
  type GetInvProductsQuery,
  type InvProductDto,
} from '~/api/generated/types';
import type { SaleItem } from '~/models/sale.model';
import type { ItemSize } from '~/models/size.model';
import { useSaleStore } from '~/stores/sale';
import { SaleSchema } from '~/validation/schema';

const props = defineProps({
  inventoryId: {
    type: String,
    required: true,
  },
  saleId: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['close-dialog']);

const authStore = useAuthStore();
const userId = authStore.user?.id || '';

const errorColor = useTheme().themes.value.light.colors.error;
const { t } = useI18n();
const validationSchema = toTypedSchema(SaleSchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema,
  initialValues: {
    date: dayjs().toISOString(),
    createdBy: userId,
  },
});

const date = useField<string>('date');
const saleNo = useField('saleNo');
const saleItems = useFieldArray('saleItems');

const saleStore = useSaleStore();

if (!saleStore.sale) {
  saleStore.sale = {
    invId: props.inventoryId,
    saleNo: saleNo.value.value as string,
    date: date.value.value as string,
    saleItems: [],
  };
}

const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const sizeHeaders = ref([
  { title: t('label.size'), key: 'size.eu', sortable: false },
  { title: t('label.quantity'), key: 'sellingQuantity', sortable: false },
  { title: t('label.quantity'), key: 'quantity', sortable: false },
]);
const table = reactive({
  headers: [
    { title: t('label.sku'), key: 'product.sku' },
    { title: t('label.colors'), key: 'product.productColors', minWidth: '140' },
    {
      title: t('label.product_category'),
      key: 'product.productGroup.productCategory.name',
    },
    {
      title: t('label.gender'),
      key: 'product.productGroup.productCategory.gender',
    },
    { title: t('label.price'), key: 'price' },
    { title: t('label.discount'), key: 'discount' },
    {
      title: t('label.sizes'),
      key: 'saleItemSizes',
      minWidth: '220',
    },
    {
      title: 'Subtotal',
      key: 'subtotal',
    },
  ],
  productIds: [],
});

enum DialogContent {
  None = 'NONE',
  Create = 'CREATE',
  Edit = 'EDIT',
}
const dialog = reactive({
  isVisible: false,
  content: DialogContent.None,
  title: 'Sale Item Form',
});

type InvProductsData = GetInvProductsQuery['getInvProducts'][number];

interface InvProductAndSaleItems extends InvProductsData {
  saleItemSizes: ItemSize[];
  subtotal: number;
}
const displayInvProducts = ref<InvProductAndSaleItems[]>([]);
const displayItemSizesMap = ref<Map<string, ItemSize[]>>(new Map());
const {
  execute: fetchInvProducts,
  data: dataInvProducts,
  isFetching: isFetchingInvProducts,
  error: errorInvProducts,
} = useQuery({
  query: GetInvProductsDocument,
  variables: { invId: props.inventoryId ?? '' },
  paused: ({ invId }) => !invId,
  tags: [CACHE_INV_PRODUCTS],
  onData(data) {
    console.log(`Data Block Executed => ${JSON.stringify(data)}`);

    displayInvProducts.value = data.getInvProducts
      .filter((product) => displayItemSizesMap.value.has(product.productId))
      .map((product) => ({
        ...product,
        saleItemSizes: displayItemSizesMap.value.get(product.productId) || [],
      }))
      .map((product) => ({
        ...product,
        subtotal: product.price
          ? product.saleItemSizes.reduce(
              (sum, item) => (sum = sum + item.quantity),
              0,
            ) * product.price
          : 0,
      }));
  },
});

const { isFetching: isFetchingSaleNo, execute: fetchSaleNo } = useQuery({
  query: GenerateSaleNoDocument,
  cachePolicy: 'network-only',
  onData(data) {
    saleNo.setValue(data.generateSaleNo);
  },
  fetchOnMount: false,
});

const {
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateSaleDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_SALES],
});

const {
  execute: fetchSale,
  data: dataSale,
  isFetching: isFetchingSale,
  error: errorSale,
} = useQuery({
  variables: { id: props.saleId! },
  query: GetSaleDocument,
  tags: [CACHE_SALE],
  fetchOnMount: false,
  onData(data) {
    const sale = data.getSale;
    date.value.value = sale.date;
    saleNo.value.value = sale.saleNo;

    displayItemSizesMap.value = new Map(
      sale.saleItems.map((item) => [
        item.productId,
        item.saleItemSizes.map((itemSize) => ({
          sizeId: itemSize.size.id,
          eu: itemSize.size.eu,
          quantity: itemSize.quantity,
        })),
      ]),
    );
  },
});

if (props.saleId) {
  fetchSale();
} else {
  fetchSaleNo();
}

const onSubmit = handleSubmit((data) => {
  executeCreate({
    data: {
      ...data,
      saleItems: data.saleItems.map((item) => ({
        productId: item.productId,
        invId: props.inventoryId,
        saleItemSizes: item.saleItemSizes.map((itemSize) => ({
          sizeId: itemSize.sizeId,
          quantity: itemSize.quantity,
        })),
      })),
    },
  });
});

watch(
  () => date.value.value,
  (newDate) => {
    if (saleStore.sale) {
      saleStore.sale.date = newDate;
    }
  },
);

watch(
  () => displayItemSizesMap.value,
  (newMap) => {
    fetchInvProducts();
  },
);

watch(
  () => saleStore.sale?.saleItems,
  (newItems) => {
    if (newItems) {
      saleItems.replace(newItems);

      displayItemSizesMap.value = new Map(
        saleStore.sale?.saleItems.map((item) => [
          item.productId,
          item.saleItemSizes,
        ]),
      );

      // console.log(
      //   `New Items Detected -> ${JSON.stringify(dataInvProducts.value)}`,
      // );
      // console.log(`New Items Are-> ${JSON.stringify(newItems)}`);
      // if (dataInvProducts.value) {
      //   displayInvProducts.value = dataInvProducts.value?.getInvProducts
      //     .filter((product) =>
      //       newItems.some((item) => item.productId === product.productId),
      //     )
      //     .map((product) => ({
      //       ...product,
      //       saleItemSizes: saleItemSizesMap.get(product.productId) || [],
      //     }))
      //     .map((product) => ({
      //       ...product,
      //       subtotal: product.price
      //         ? product.saleItemSizes.reduce(
      //             (sum, item) => (sum = sum + item.quantity),
      //             0,
      //           ) * product.price
      //         : 0,
      //     }));
      // }
    }
  },
  { immediate: true },
);

watchEffect(() => {
  // console.log(`SaleCreateFormValues -> ${JSON.stringify(values)}`);
  // console.log(
  //   `Data InvProducts -> ${JSON.stringify(displayInvProducts.value)}`,
  // );
  // console.log(`Sale Store = ${JSON.stringify(saleStore.sale)}`);
});

function closeDialog() {
  dialog.isVisible = false;
  fetchInvProducts();
}
</script>
