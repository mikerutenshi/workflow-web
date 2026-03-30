<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError || updateError || deleteError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(createError || updateError || deleteError) }}
          </v-alert>
        </v-col>
      </v-row>
      <ActionPickDate
        v-model="trfDate.value.value"
        :error-messages="trfDate.errorMessage.value"
        :readonly="props.isReadonly"
      ></ActionPickDate>

      <v-text-field
        :label="$t('label.trf_no')"
        :error-messages="trfNo.errorMessage.value"
        v-model="trfNo.value.value"
        :readonly="props.isReadonly"
      />

      <v-row>
        <v-col cols="12" lg="5">
          <v-autocomplete
            :label="$t('label.from_inv')"
            auto-select-first
            item-value="id"
            item-title="name"
            :items="inventories?.getInventories"
            :loading="isFetchingInventories"
            v-model="fromInvId.value.value"
            :error-messages="fromInvId.errorMessage.value"
            :readonly="props.isReadonly"
          >
          </v-autocomplete>
        </v-col>
        <v-col class="d-flex align-center justify-center" cols="12" lg="2">
          <v-icon :icon="mdiTransferRight"></v-icon>
        </v-col>
        <v-col cols="12" lg="5">
          <v-autocomplete
            :label="$t('label.to_inv')"
            auto-select-first
            item-value="id"
            item-title="name"
            :items="inventories?.getInventories"
            :loading="isFetchingInventories"
            v-model="toInvId.value.value"
            :error-messages="toInvId.errorMessage.value"
            :readonly="props.isReadonly"
          >
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-select
        :label="$t('label.status')"
        :items="progressList"
        v-model="progress.value.value"
        :error-messages="progress.errorMessage.value"
        :readonly="props.isReadonly"
      >
      </v-select>

      <v-card
        v-if="fromInvId.value.value && toInvId.value.value"
        variant="outlined"
      >
        <v-card-title>{{ $t('card.products_to_trf') }}</v-card-title>
        <v-data-table
          :headers="tableHeaders"
          :items="computeTrfItems"
          :search="search"
          :loading="isFetchingTrfItems"
          item-value="id"
          v-model="itemIdSelections"
          hover
          :page="pageNo"
          :items-per-page="itemsPerPage"
          :show-select="!props.isReadonly"
        >
          <template #loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>

          <template #item.progress="{ item }">{{
            $t(`progress.${item.progress}`)
          }}</template>

          <template #item.discount="{ item }">{{
            item.discount
              ? formatDiscount(convertDecimalToPercent(item.discount))
              : null
          }}</template>

          <template #item.product.productGroup.msrp="{ item }">{{
            formatRupiah(destPricePipe(item.product.productGroup.msrp))
          }}</template>

          <template v-slot:item.invTrfItemSizes="{ item }">
            <v-table density="compact">
              <tbody>
                <tr v-for="i in item.invTrfItemSizes" :key="i.size.id">
                  <td>{{ i.size.eu }}</td>
                  <td>{{ i.quantity }}</td>
                </tr>
                <tr>
                  <td><i>Total</i></td>
                  <td>
                    <i>
                      {{
                        item.invTrfItemSizes.reduce(
                          (sum, size) => sum + size.quantity,
                          0,
                        )
                      }}
                    </i>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </template>
        </v-data-table>
        <span :style="{ color: errorColor }" class="ma-4 text-caption">
          {{ errors['invTrfItemIds'] }}
        </span>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <template v-if="props.isReadonly">
        <ActionPrintInvTrf
          :inv-trf-id="props.invTrfId"
          :disabled="!props.invTrfId"
        ></ActionPrintInvTrf>
      </template>
      <template v-else>
        <ActionConfirm :loading="props.invTrfId ? isUpdating : isCreating">{{
          submitBtnTitle
        }}</ActionConfirm>
      </template>
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
import { mdiTransferRight } from '@mdi/js';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useTheme } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  CreateInvTrfDocument,
  UpdateInvTrfDocument,
  DeleteInvTrfDocument,
  GetInventoriesDocument,
  GetInvTrfItemsDocument,
  GetInvTrfDocument,
  Progress,
  GenerateInvTrfNoDocument,
} from '~/api/generated/types';
import { InvTrfSchema } from '~/validation/schema';

const errorColor = useTheme().themes.value.light.colors.error;
const { t } = useI18n();
const props = defineProps({
  invTrfId: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  isReadonly: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const submitBtnTitle = computed(() =>
  props.invTrfId ? t('btn.update') : t('btn.create'),
);

const authStore = useAuthStore();
const userId = authStore.user?.id || '';

const validationSchema = toTypedSchema(InvTrfSchema);
const { handleSubmit, values, errors, setFieldValue } = useForm({
  validationSchema,
  initialValues: {
    trfDate: dayjs().toISOString(),
    progress: Progress.Initiated,
    createdBy: userId,
  },
});
const trfNo = useField('trfNo');
const fromInvId = useField('fromInvId');
const toInvId = useField('toInvId');
const trfDate = useField<string>('trfDate');
const progress = useField<Progress>('progress');
const { fields, push, remove, replace } = useFieldArray('invTrfItemIds');

const progressList = Object.values(Progress)
  .map((value) => {
    return { value, title: t(`progress.${value}`) };
  })
  .filter((progress) => progress.value !== Progress.Pending);

const { data: inventories, isFetching: isFetchingInventories } = useQuery({
  query: GetInventoriesDocument,
  tags: [CACHE_INVENTORIES],
});
const { isFetching: isFetchingTrfNo, execute: fetchInvTrfNo } = useQuery({
  query: GenerateInvTrfNoDocument,
  cachePolicy: 'network-only',
  onData(data) {
    trfNo.setValue(data.generateInvTrfNo);
  },
  fetchOnMount: false,
});
const {
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateInvTrfDocument, {
  onData(data) {
    const id = data.createInvTrf.id;
    console.log(`Created Id: ${id}`);
    snack.message = t('status.saved');
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_INV_TRFS, CACHE_INV_PRODUCTS, CACHE_INV_TRFS_PER_ITEM],
});
const {
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateInvTrfDocument, {
  onData(data) {
    const id = data.updateInvTrf.id;
    snack.message = t('status.saved');
    snack.isVisible = true;
  },
  clearCacheTags: [
    CACHE_INV_TRFS,
    CACHE_INV_TRF,
    CACHE_INV_PRODUCTS,
    CACHE_INV_TRFS_PER_ITEM,
  ],
});
const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteInvTrfDocument, {
  onData(data) {
    snack.message = t('status.deleted');
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_INV_TRFS, CACHE_INV_TRF, CACHE_INV_TRFS_PER_ITEM],
});

const variables = reactive({
  fromInvId: '',
  toInvId: '',
  progress: undefined as Progress | undefined,
});

if (!props.invTrfId) {
  variables.progress = Progress.Pending;
}

const computeTrfItems = computed(() => {
  if (props.isReadonly) {
    return trfItemsData.value?.getInvTrfItems.filter((item) =>
      itemIdSelections.value.some((id) => id === item.id),
    );
  } else {
    return trfItemsData.value?.getInvTrfItems.filter(
      (item) =>
        item.progress === Progress.Pending ||
        item.invTrf?.id === props.invTrfId,
    );
  }
});
const computeToInv = computed(() => {
  const toInv = inventories.value?.getInventories
    ? inventories.value.getInventories.find(
        (inv) => inv.id === toInvId.value.value,
      )
    : null;

  return toInv;
});
const {
  data: trfItemsData,
  isFetching: isFetchingTrfItems,
  error: trfItemsError,
} = useQuery({
  variables,
  query: GetInvTrfItemsDocument,
  tags: [CACHE_INV_TRF_ITEMS],
});

const {
  execute: fetchTransfer,
  data: invTrfData,
  isFetching: isFetchingInvTrf,
  error: invTrfError,
} = useQuery({
  variables: { id: props.invTrfId! },
  query: GetInvTrfDocument,
  tags: [CACHE_INV_TRF],
  fetchOnMount: false,
  onData(data) {
    const invTrf = data.getInvTrf;
    trfDate.setValue(invTrf.trfDate);
    trfNo.setValue(invTrf.trfNo);
    if (invTrf.fromInv) fromInvId.setValue(invTrf.fromInv.id);
    toInvId.setValue(invTrf.toInv.id);
    progress.setValue(invTrf.progress);
    itemIdSelections.value = invTrf.invTrfItems.map((item) => item.id);
  },
});

if (props.invTrfId) {
  fetchTransfer();
  setFieldValue('updatedBy', userId);
} else {
  fetchInvTrfNo();
}

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const tableHeaders: ReadOnlyHeaders = [
  { title: t('label.sku'), key: 'product.sku' },
  { title: t('label.from_inv'), key: 'fromInv.name' },
  { title: t('label.to_inv'), key: 'toInv.name' },
  { title: t('label.dest_price'), key: 'product.productGroup.msrp' },
  { title: t('label.discount'), key: 'discount' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.sizes'), key: 'invTrfItemSizes', minWidth: '120' },
];
const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');

const itemIdSelections = ref<string[]>([]);

const onSubmit = handleSubmit((data) => {
  console.log(`data: ${JSON.stringify(data)}`);
  if (!props.invTrfId) {
    executeCreate({ data });
  } else {
    const { createdBy, ...updateData } = {
      ...data,
      updatedBy: data.updatedBy || userId,
    };
    executeUpdate({ id: props.invTrfId, data: updateData });
  }
});
const deleteInvTrf = (id: string) => {
  executeDelete({ id });
};

function destPricePipe(msrp: number | null | undefined): number {
  if (computeToInv.value) {
    const invPrice = calculatePrice(
      msrp ?? 0,
      computeToInv.value.priceFormula?.offset,
      computeToInv.value?.priceFormula?.multiplier,
      computeToInv.value?.priceFormula?.discounts,
    );
    return invPrice ?? 0;
  } else {
    return 0;
  }
}

watch(itemIdSelections, (newValues) => {
  console.log(`item id selections: ${JSON.stringify(newValues)}`);
  replace(newValues);
});

watchEffect(() => {
  if (fromInvId.value.value && toInvId.value.value) {
    console.log('Triggered');
    // if (!props.invTrfId) {
    variables.fromInvId = fromInvId.value.value as string;
    variables.toInvId = toInvId.value.value as string;
    // }
  }
  console.log(`form values: ${JSON.stringify(values)}`);
});
</script>
