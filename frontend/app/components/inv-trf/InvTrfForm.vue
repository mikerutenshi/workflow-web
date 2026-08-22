<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError || updateError || deleteError || errorInvTrf">
        <v-col>
          <v-alert type="error">
            {{
              extractGraphQlError(
                createError || updateError || deleteError || errorInvTrf,
              )
            }}
          </v-alert>
        </v-col>
      </v-row>
      <ActionPickDate
        v-model="trfDate.value.value"
        :error-messages="trfDate.errorMessage.value"
        :readonly="readonlyDisplay"
      ></ActionPickDate>

      <v-text-field
        :label="$t('label.trf_no')"
        :error-messages="trfNo.errorMessage.value"
        v-model="trfNo.value.value"
        readonly
        :loading="isFetchingTrfNo"
      />

      <v-row>
        <v-col cols="12" lg="5">
          <v-autocomplete
            :label="$t('label.from_inv')"
            auto-select-first
            item-value="id"
            item-title="name"
            :items="fromInventories"
            :loading="isFetchingInventories"
            v-model="fromInvId.value.value"
            :error-messages="fromInvId.errorMessage.value"
            :readonly="readonlyDisplay"
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
            :items="dataInventories?.getInventories"
            :loading="isFetchingInventories"
            v-model="toInvId.value.value"
            :error-messages="toInvId.errorMessage.value"
            :readonly="readonlyDisplay"
          >
          </v-autocomplete>
        </v-col>
      </v-row>

      <v-select
        :label="$t('label.status')"
        :items="progressList"
        v-model="progress.value.value"
        :error-messages="progress.errorMessage.value"
        :readonly="
          (authStore.user?.role.clearanceLevel ?? 99) <= Role.Finance
            ? false
            : readonlyDisplay
              ? true
              : false
        "
      >
      </v-select>

      <v-card
        v-if="fromInvId.value.value && toInvId.value.value"
        variant="outlined"
        class="mb-4"
      >
        <v-card-title>{{ $t('card.products_to_trf') }}</v-card-title>
        <v-card-subtitle>
          {{ $t('label.items_selected', selectedCount) }} ·
          {{ $t('label.pairs', selectedTotalQty) }}
        </v-card-subtitle>
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
          :show-select="!readonlyDisplay"
        >
          <template #loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>

          <template #item.progress="{ item }">{{
            $t(`progress.${item.progress}`)
          }}</template>

          <template #item.discounts="{ item }">{{
            item.discounts
              ? item.discounts
                  .map((disc) => formatDiscount(convertDecimalToPercent(disc)))
                  .join(' + ')
              : null
          }}</template>

          <template #item.price="{ item }">{{
            formatRupiah(item.price)
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
        <span class="ma-4 text-error">
          {{ errors['invTrfItemIds'] }}
        </span>
      </v-card>

      <v-textarea
        v-model="note.value.value"
        :label="$t('label.note')"
        :error-messages="note.errorMessage.value"
        counter
        :clearable="readonlyDisplay"
        :rules="[
          (v?: string) =>
            (v ?? '').length <= 255 ||
            $t('zodI18n.errors.too_big.string.inclusive', { maximum: 255 }),
        ]"
        rows="3"
        :readonly="readonlyDisplay"
      >
      </v-textarea>
    </v-card-text>

    <v-card-actions
      v-if="
        (authStore.user?.role.clearanceLevel ?? 99) <= Role.Finance
          ? true
          : readonlyDisplay
            ? false
            : true
      "
    >
      <v-spacer></v-spacer>
      <ActionConfirm :loading="props.invTrfId ? isUpdating : isCreating">{{
        submitBtnTitle
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { mdiTransferRight } from '@mdi/js';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  CreateInvTrfDocument,
  DeleteInvTrfDocument,
  GenerateInvTrfNoDocument,
  GetInventoriesDocument,
  GetInvTrfDocument,
  GetInvTrfItemsDocument,
  Progress,
  UpdateInvTrfDocument,
} from '~/api/generated/types';
import { InvTrfSchema } from '~/validation/schema';

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
const readonlyDisplay = computed(() => {
  if (
    dataInvTrf.value?.getInvTrf.progress === Progress.Completed ||
    dataInvTrf.value?.getInvTrf.progress === Progress.InProgress ||
    props.isReadonly
  ) {
    return true;
  } else {
    return false;
  }
});

const emit = defineEmits(['form-submit']);
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
const note = useField('note');
const { fields, push, remove, replace } = useFieldArray('invTrfItemIds');

const progressList = getProgresses(authStore.user?.role.clearanceLevel).map(
  (value) => {
    return { value, title: t(`progress.${value}`) };
  },
);

const { data: dataInventories, isFetching: isFetchingInventories } = useQuery({
  query: GetInventoriesDocument,
  tags: [CACHE_INVENTORIES],
});

// const getTrfNoParam = computed(() => ({
//   date: trfDate.value.value,
// }));
const { isFetching: isFetchingTrfNo, execute: generateInvTrfNo } = useQuery({
  query: GenerateInvTrfNoDocument,
  cachePolicy: 'network-only',
  // variables: getTrfNoParam,
  onData(data) {
    trfNo.setValue(data.generateInvTrfNo);
  },
  fetchOnMount: false,
});
const snack = useSnackbarStore();
const {
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateInvTrfDocument, {
  onData(data) {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_INV_TRFS, CACHE_INV_PRODUCTS, CACHE_INV_TRFS_PER_ITEM],
});
const {
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateInvTrfDocument, {
  onData(data) {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [
    CACHE_INV_TRFS,
    CACHE_INV_TRF,
    CACHE_INV_TRF_ITEMS,
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
    emit('form-submit');
    snack.show(t('status.deleted'), SnackColor.Success);
  },
  refetchTags: [CACHE_INV_TRFS, CACHE_INV_TRF, CACHE_INV_TRFS_PER_ITEM],
});

const variables = reactive({
  fromInvId: '',
  toInvId: '',
  progress: undefined as Progress[] | undefined,
});

if (!props.invTrfId) {
  variables.progress = [Progress.Pending];
}

const computeTrfItems = computed(() => {
  if (props.isReadonly) {
    return trfItemsData.value?.getInvTrfItems.filter((item) =>
      itemIdSelections.value.some((id) => id === item.id),
    );
  } else {
    return trfItemsData.value?.getInvTrfItems.filter(
      (item) =>
        [Progress.Pending, Progress.Initiated].includes(item.progress) ||
        item.invTrf?.id === props.invTrfId,
    );
  }
});
const selectedCount = computed(() => itemIdSelections.value.length);
const selectedTotalQty = computed(() => {
  const items = trfItemsData.value?.getInvTrfItems ?? [];
  return items
    .filter((item) => itemIdSelections.value.includes(item.id))
    .reduce(
      (sum, item) =>
        sum + item.invTrfItemSizes.reduce((s, i) => s + (i.quantity ?? 0), 0),
      0,
    );
});
const computeToInv = computed(() => {
  const toInv = dataInventories.value?.getInventories
    ? dataInventories.value.getInventories.find(
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
  data: dataInvTrf,
  isFetching: isFetchingInvTrf,
  error: errorInvTrf,
} = useQuery({
  variables: { id: props.invTrfId! },
  query: GetInvTrfDocument,
  tags: [CACHE_INV_TRF],
  fetchOnMount: false,
  cachePolicy: 'network-only',
  onData(data) {
    isProgrammaticTrfDateUpdate = true;
    trfDate.setValue(data.getInvTrf.trfDate);
    trfNo.setValue(data.getInvTrf.trfNo);
    if (data.getInvTrf.fromInv) fromInvId.setValue(data.getInvTrf.fromInv.id);
    toInvId.setValue(data.getInvTrf.toInv.id);
    progress.setValue(data.getInvTrf.progress);
    itemIdSelections.value = data.getInvTrf.invTrfItems.map((item) => item.id);
    note.setValue(data.getInvTrf.note);
  },
});

const fromInventories = computed(() => {
  if (props.isReadonly) {
    return dataInventories.value?.getInventories;
  } else {
    return authStore.user?.userInventories;
  }
});

if (props.invTrfId) {
  fetchTransfer();
  setFieldValue('updatedBy', userId);
} else {
  generateInvTrfNo({ variables: { date: trfDate.value.value } });
}

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const tableHeaders: ReadOnlyHeaders = [
  { title: t('label.sku'), key: 'product.sku' },
  { title: t('label.from_inv'), key: 'fromInv.name' },
  { title: t('label.to_inv'), key: 'toInv.name' },
  { title: t('label.dest_price'), key: 'price' },
  { title: t('label.discount'), key: 'discounts' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.sizes'), key: 'invTrfItemSizes', minWidth: '120' },
];
const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');

const itemIdSelections = ref<string[]>([]);

let isProgrammaticTrfDateUpdate = false;

const onSubmit = handleSubmit((data) => {
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

watch(itemIdSelections, (newValues) => {
  replace(newValues);
});

watchEffect(() => {
  if (fromInvId.value.value && toInvId.value.value) {
    variables.fromInvId = fromInvId.value.value as string;
    variables.toInvId = toInvId.value.value as string;
  }
});

watch(trfDate.value, (newDate) => {
  if (isProgrammaticTrfDateUpdate) {
    isProgrammaticTrfDateUpdate = false;
    return;
  }
  if (!props.isReadonly && newDate) {
    generateInvTrfNo({ variables: { date: trfDate.value.value } });
  }
});
</script>
