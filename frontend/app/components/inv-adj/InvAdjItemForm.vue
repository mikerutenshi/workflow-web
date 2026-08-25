<template>
  <v-card variant="outlined" class="mb-4">
    <v-card-title class="d-flex align-center">
      <span>{{ `${$t('label.product')} ${index + 1}` }}</span>
      <v-spacer></v-spacer>
      <v-btn
        v-if="!isReadonly"
        :icon="mdiTrashCan"
        variant="text"
        class="text-error"
        @click="emit('remove')"
      ></v-btn>
    </v-card-title>

    <v-card-text>
      <v-row>
        <v-col cols="12" md="7">
          <!--
            Sourced from the full catalog, not getInvProducts: a SKU that is not
            stocked at this warehouse yet is exactly what an opname needs to be
            able to record.
          -->
          <v-autocomplete
            :label="$t('label.product')"
            auto-select-first
            item-value="id"
            item-title="sku"
            :items="productsData?.getProducts"
            :loading="isFetchingProducts"
            v-model="productIdModel"
            :error-messages="errorFor('productId')"
            :readonly="isReadonly"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="item.sku"
                :subtitle="
                  [
                    item.productGroup.productCategory.name,
                    $t(renderGender(item.productGroup.productCategory.gender)),
                    item.productGroup.name,
                  ]
                    .filter(Boolean)
                    .join(' | ')
                "
              >
              </v-list-item>
            </template>
          </v-autocomplete>
        </v-col>

        <v-col cols="12" md="5">
          <v-select
            :label="$t('label.reason')"
            :items="reasonOptions"
            item-title="title"
            item-value="value"
            v-model="reasonModel"
            :error-messages="errorFor('reason')"
            :readonly="isReadonly"
          ></v-select>
        </v-col>
      </v-row>

      <v-alert
        v-if="!isStocked && productIdModel"
        type="info"
        density="compact"
        class="mb-4"
      >
        {{ $t('label.not_stocked_here') }}
      </v-alert>

      <v-alert
        v-if="pendingTotal > 0"
        type="warning"
        density="compact"
        class="mb-4"
      >
        {{ $t('label.pending_trf_warning', { count: pendingTotal }) }}
        <!--
          Items queued via "Send to" are not attached to a transfer document
          yet, so there is no number to show for them.
        -->
        <div v-if="pendingTrfNos" class="mt-1">
          {{ $t('label.pending_trf_nos', { trfNos: pendingTrfNos }) }}
        </div>
      </v-alert>

      <v-data-table
        v-if="productIdModel"
        :headers="tableHeaders"
        :items="sizeRows"
        hide-default-footer
        :items-per-page="-1"
        density="compact"
      >
        <template #item.countedQty="{ item, index: rowIndex }">
          <v-number-input
            v-model="item.countedQty"
            :label="$t('label.counted_qty')"
            :min="0"
            :readonly="isReadonly"
            density="compact"
            hide-details="auto"
            :error-messages="
              errorFor(`invAdjItemSizes[${rowIndex}].countedQty`)
            "
          />
        </template>

        <template #item.variance="{ item }">
          <span :class="varianceClass(item.countedQty - item.systemQty)">
            {{ formatVariance(item.countedQty - item.systemQty) }}
          </span>
        </template>

        <template #body.append>
          <tr>
            <td>
              <i>{{ $t('label.total_variance') }}</i>
            </td>
            <td></td>
            <td></td>
            <td>
              <i :class="varianceClass(totalVariance)">
                {{ formatVariance(totalVariance) }}
              </i>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-text-field
        v-if="productIdModel"
        :label="$t('label.note')"
        v-model="noteModel"
        :readonly="isReadonly"
        clearable
        counter="255"
      />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { mdiTrashCan } from '@mdi/js';
import { useQuery } from 'villus';
import {
  AdjReason,
  Gender,
  GetProductsDocument,
  GetSizesDocument,
  Progress,
  type GetInvProductsQuery,
} from '~/api/generated/types';

type InvProductRow = GetInvProductsQuery['getInvProducts'][number];

export type InvAdjItemModel = {
  productId: string;
  reason: AdjReason;
  note?: string | null;
  invAdjItemSizes: {
    sizeId: string;
    systemQty: number;
    countedQty: number;
  }[];
};

const { t } = useI18n();

const props = defineProps({
  index: { type: Number, required: true },
  isReadonly: { type: Boolean, default: false },
  /** Stock rows for the selected warehouse; a product absent here is unstocked. */
  invProducts: {
    type: Array as PropType<InvProductRow[]>,
    default: () => [],
  },
  errors: {
    type: Object as PropType<Record<string, string | undefined>>,
    default: () => ({}),
  },
});
const emit = defineEmits(['remove']);

const model = defineModel<InvAdjItemModel>({ required: true });

const productIdModel = computed({
  get: () => model.value.productId,
  set: (v: string) => (model.value = { ...model.value, productId: v }),
});
const reasonModel = computed({
  get: () => model.value.reason,
  set: (v: AdjReason) => (model.value = { ...model.value, reason: v }),
});
const noteModel = computed({
  get: () => model.value.note ?? '',
  set: (v: string | null) => (model.value = { ...model.value, note: v }),
});

function errorFor(field: string) {
  return props.errors[`invAdjItems[${props.index}].${field}`];
}

const { data: productsData, isFetching: isFetchingProducts } = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});
const { data: sizesData } = useQuery({
  query: GetSizesDocument,
  tags: [CACHE_SIZES],
});

const selectedProduct = computed(() =>
  productsData.value?.getProducts.find((p) => p.id === productIdModel.value),
);

/** The InvToProduct row for this SKU at this warehouse, if it has one at all. */
const stocked = computed(() =>
  props.invProducts.find((p) => p.productId === productIdModel.value),
);
const isStocked = computed(() => !!stocked.value);

// Candidate sizes come from the Size table filtered by the product's gender,
// not from invProductSizes: a new SKU has none, and an existing one omits any
// size that has reached zero.
const candidateSizes = computed(() => {
  const gender = selectedProduct.value?.productGroup.productCategory.gender;
  const all = sizesData.value?.getSizes ?? [];
  return gender === Gender.Men || gender === Gender.Women
    ? all.filter((size) => size.gender === gender)
    : all;
});

function pendingForSize(sizeId: string) {
  return (
    stocked.value?.invTrfItems
      .filter((i) => i.progress !== Progress.Completed)
      .reduce(
        (sum, i) =>
          sum +
          i.invTrfItemSizes
            .filter((s) => s.size.id === sizeId)
            .reduce((a, b) => a + b.quantity, 0),
        0,
      ) ?? 0
  );
}

const sizeRows = ref<
  {
    sizeId: string;
    eu: string;
    systemQty: number;
    pendingQty: number;
    countedQty: number;
  }[]
>([]);

type SavedSize = InvAdjItemModel['invAdjItemSizes'][number];

// Snapshotted at setup, before the rebuild below can overwrite the model. The
// rows are built asynchronously (they wait on the products, sizes and stock
// queries), so the document's own counts have to be held aside until there are
// rows to put them in.
const savedProductId = model.value.productId;
const savedSizes = new Map<string, SavedSize>(
  (model.value.invAdjItemSizes ?? []).map((s) => [s.sizeId, s]),
);

// Tracks which product the current rows belong to, so switching products drops
// the previous product's counts instead of carrying them across.
let builtForProductId: string | null = null;

// Rebuilt whenever the product (or the stock behind it) changes. Per size, the
// count comes from: what the user is already editing, else what the document
// saved, else current stock -- seeding countedQty to systemQty so the variance
// starts at zero and only the sizes that actually differ need touching.
watch(
  [candidateSizes, stocked],
  () => {
    const productId = productIdModel.value;

    const edits =
      builtForProductId === productId
        ? new Map(sizeRows.value.map((r) => [r.sizeId, r]))
        : new Map<string, (typeof sizeRows.value)[number]>();

    const saved =
      productId && productId === savedProductId
        ? savedSizes
        : new Map<string, SavedSize>();

    sizeRows.value = candidateSizes.value.map((size) => {
      const current =
        stocked.value?.invProductSizes.find((s) => s.size.id === size.id)
          ?.quantity ?? 0;
      const edited = edits.get(size.id);
      const fromDoc = saved.get(size.id);

      return {
        sizeId: size.id,
        eu: size.eu,
        systemQty: edited?.systemQty ?? fromDoc?.systemQty ?? current,
        pendingQty: pendingForSize(size.id),
        countedQty: edited?.countedQty ?? fromDoc?.countedQty ?? current,
      };
    });

    builtForProductId = productId;
  },
  { immediate: true },
);

const totalVariance = computed(() =>
  sizeRows.value.reduce((sum, r) => sum + (r.countedQty - r.systemQty), 0),
);
const pendingTotal = computed(() =>
  sizeRows.value.reduce((sum, r) => sum + r.pendingQty, 0),
);
const pendingTrfNos = computed(() =>
  [
    ...new Set(
      stocked.value?.invTrfItems
        .filter((i) => i.progress !== Progress.Completed)
        .map((i) => i.invTrf?.trfNo)
        .filter((no): no is string => !!no) ?? [],
    ),
  ].join(', '),
);

// Only sizes that were actually counted or already held stock are worth
// persisting; the rest are noise on the count sheet.
watch(
  sizeRows,
  (rows) => {
    model.value = {
      ...model.value,
      invAdjItemSizes: rows
        .filter((r) => r.systemQty > 0 || r.countedQty > 0)
        .map((r) => ({
          sizeId: r.sizeId,
          systemQty: r.systemQty,
          countedQty: r.countedQty,
        })),
    };
  },
  { deep: true },
);

const reasonOptions = computed(() =>
  Object.values(AdjReason).map((value) => ({
    value,
    title: t(`adj_reason.${value}`),
  })),
);

const tableHeaders = [
  { title: t('label.size'), key: 'eu', sortable: false },
  { title: t('label.system_qty'), key: 'systemQty', sortable: false },
  { title: t('label.counted_qty'), key: 'countedQty', sortable: false },
  { title: t('label.variance'), key: 'variance', sortable: false },
] as const;

function formatVariance(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}
function varianceClass(value: number) {
  if (value > 0) return 'text-success';
  if (value < 0) return 'text-error';
  return '';
}
</script>
