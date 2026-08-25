<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError || updateError || errorInvAdj">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(createError || updateError || errorInvAdj) }}
          </v-alert>
        </v-col>
      </v-row>

      <ActionPickDate
        v-model="adjDate.value.value"
        :label="$t('label.adj_date')"
        :error-messages="adjDate.errorMessage.value"
        :readonly="isReadonly"
      ></ActionPickDate>

      <v-text-field
        :label="$t('label.adj_no')"
        :error-messages="adjNo.errorMessage.value"
        v-model="adjNo.value.value"
        readonly
        :loading="isFetchingAdjNo"
      />

      <!--
        Readonly by design: the warehouse is chosen by the table's filter, which
        is also what gates the New button, so a sheet can never be counted
        against a warehouse the list is not showing.
      -->
      <v-text-field
        :label="$t('label.inventory')"
        :model-value="inventoryName"
        :error-messages="invId.errorMessage.value"
        readonly
      />

      <v-textarea
        :label="$t('label.note')"
        v-model="note.value.value"
        :error-messages="note.errorMessage.value"
        :readonly="isReadonly"
        rows="2"
        counter="255"
        clearable
      ></v-textarea>

      <v-card variant="outlined" class="mt-2">
        <v-card-title>{{ $t('card.count_sheet') }}</v-card-title>
        <v-card-subtitle v-if="items.length">
          {{ $t('label.items_counted', items.length) }}
        </v-card-subtitle>
        <v-card-text>
          <v-alert v-if="!invId.value.value" type="info" density="compact">
            {{ $t('label.select_inventories') }}
          </v-alert>

          <template v-else>
            <InvAdjItemForm
              v-for="(item, index) in items"
              :key="index"
              v-model="items[index]!"
              :index="index"
              :is-readonly="isReadonly"
              :inv-products="invProductsData?.getInvProducts ?? []"
              :errors="errors as Record<string, string | undefined>"
              @remove="items.splice(index, 1)"
            />

            <div
              v-if="errors['invAdjItems']"
              class="text-error text-caption mb-2"
            >
              {{ errors['invAdjItems'] }}
            </div>

            <v-btn
              v-if="!isReadonly"
              :prepend-icon="mdiPlus"
              color="primary"
              variant="tonal"
              @click="addItem"
              >{{ $t('btn.add_counted_item') }}</v-btn
            >
          </template>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-actions v-if="!isReadonly">
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isCreating || isUpdating">{{
        submitBtnTitle
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { mdiPlus } from '@mdi/js';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import {
  AdjReason,
  CreateInvAdjDocument,
  GenerateInvAdjNoDocument,
  GetInvAdjDocument,
  GetInvProductsDocument,
  UpdateInvAdjDocument,
} from '~/api/generated/types';
import type { InvAdjItemModel } from './InvAdjItemForm.vue';
import { InvAdjSchema } from '~/validation/schema';

const { t } = useI18n();

const props = defineProps({
  invAdjId: {
    type: [String, null] as PropType<string | null>,
    required: true,
  },
  /** Seeds a new sheet from the table's warehouse filter. Ignored when editing:
   *  getInvAdj supplies the warehouse the sheet was already counted against. */
  inventoryId: {
    type: [String, null] as PropType<string | null>,
    default: null,
  },
  isReadonly: { type: Boolean, default: false },
});
const emit = defineEmits(['form-submit']);

const submitBtnTitle = computed(() =>
  props.invAdjId ? t('btn.update') : t('btn.create'),
);

const authStore = useAuthStore();
const userInventories = authStore.user?.userInventories ?? [];

const validationSchema = toTypedSchema(InvAdjSchema);
const { handleSubmit, errors, setFieldValue, values } = useForm({
  validationSchema,
  initialValues: {
    adjDate: dayjs().toISOString(),
    invId: props.inventoryId ?? userInventories.at(0)?.id ?? '',
  },
});

const adjNo = useField<string>('adjNo');
const adjDate = useField<string>('adjDate');
const invId = useField<string>('invId');
const note = useField<string>('note');

// Resolved from the fetched document first: a user may be entitled to read a
// sheet for a warehouse that is not in their own userInventories (Finance, for
// instance, can have none assigned), which the local lookup alone would miss.
const fetchedInventoryName = ref('');
const inventoryName = computed(
  () =>
    fetchedInventoryName.value ||
    userInventories.find((inv) => inv.id === invId.value.value)?.name ||
    '',
);

// The item rows are edited as a plain array and mirrored into the form so the
// child component can own its own row-building logic.
const items = ref<InvAdjItemModel[]>([]);
watch(items, (value) => setFieldValue('invAdjItems', value as any), {
  deep: true,
});

function addItem() {
  items.value.push({
    productId: '',
    reason: AdjReason.CountCorrection,
    note: '',
    invAdjItemSizes: [],
  });
}

// Stock for the selected warehouse. This is the "available" figure (it already
// excludes stock reserved by pending transfers), which is the baseline the
// count sheet compares against.
const { data: invProductsData } = useQuery({
  query: GetInvProductsDocument,
  variables: computed(() => ({ invId: invId.value.value })),
  paused: ({ invId: id }) => !id,
  tags: [CACHE_INV_PRODUCTS],
});

const { isFetching: isFetchingAdjNo, execute: generateAdjNo } = useQuery({
  query: GenerateInvAdjNoDocument,
  cachePolicy: 'network-only',
  onData(data) {
    adjNo.setValue(data.generateInvAdjNo);
  },
  fetchOnMount: false,
});

const { error: errorInvAdj, execute: fetchInvAdj } = useQuery({
  query: GetInvAdjDocument,
  variables: { id: props.invAdjId! },
  tags: [CACHE_INV_ADJ],
  cachePolicy: 'network-only',
  fetchOnMount: false,
  onData(data) {
    const adj = data.getInvAdj;
    isProgrammaticDateUpdate = true;
    adjDate.setValue(adj.adjDate);
    adjNo.setValue(adj.adjNo);
    invId.setValue(adj.invId);
    fetchedInventoryName.value = adj.inventory.name;
    note.setValue(adj.note ?? '');
    items.value = adj.invAdjItems.map((item) => ({
      productId: item.productId,
      reason: item.reason,
      note: item.note ?? '',
      invAdjItemSizes: item.invAdjItemSizes.map((size) => ({
        sizeId: size.size.id,
        systemQty: size.systemQty,
        countedQty: size.countedQty,
      })),
    }));
  },
});

const snack = useSnackbarStore();
const {
  execute: executeCreate,
  isFetching: isCreating,
  error: createError,
} = useMutation(CreateInvAdjDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_INV_ADJS, CACHE_INV_ADJ],
});

const {
  execute: executeUpdate,
  isFetching: isUpdating,
  error: updateError,
} = useMutation(UpdateInvAdjDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_INV_ADJS, CACHE_INV_ADJ],
});

let isProgrammaticDateUpdate = false;

if (!props.invAdjId) {
  generateAdjNo({ variables: { date: adjDate.value.value } });
} else {
  fetchInvAdj();
}

// A draft carries no stock effect, so the document number tracks the count date
// right up until it is posted.
watch(adjDate.value, (newDate) => {
  if (isProgrammaticDateUpdate) {
    isProgrammaticDateUpdate = false;
    return;
  }
  if (!props.invAdjId && newDate) {
    generateAdjNo({ variables: { date: newDate } });
  }
});

// createdBy/updatedBy are set server-side from the authenticated context, so
// there is nothing actor-shaped to strip out of the payload here.
const onSubmit = handleSubmit((data) => {
  if (!props.invAdjId) {
    executeCreate({ data });
  } else {
    executeUpdate({ id: props.invAdjId, data });
  }
});
</script>
