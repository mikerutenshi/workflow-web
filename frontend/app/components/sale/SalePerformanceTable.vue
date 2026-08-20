<template>
  <v-row v-if="error" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(error) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-card rounded variant="flat" class="mb-4">
    <v-card-text>
      <v-row no-gutters class="d-flex">
        <v-col class="d-flex flex-column align-center justify-end">
          <div
            class="d-flex flex-column align-start justify-space-between flex-grow-1"
          >
            <p>{{ $t('label.total_quantity_sold') }}</p>
            <h2>{{ $t('label.pairs', totalQuantitySold) }}</h2>
          </div>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="table.headers"
        :items="data?.getSalePerformance"
        :search="table.search"
        :loading="isFetching"
        item-value="productId"
        fixed-header
        hover
        :page="table.page"
        :items-per-page="table.itemsPerPage"
      >
        <template #top>
          <v-row class="mx-4 my-2">
            <v-col cols="12" sm="4">
              <ActionPickDate
                v-model="dates"
                @update:model-value="manageDates"
                multiple="range"
                :hide-details="true"
                density="compact"
              ></ActionPickDate>
            </v-col>
            <v-col cols="12" sm="4">
              <v-select
                :label="$t('label.select_inventories')"
                :prepend-inner-icon="mdiWarehouse"
                :items="inventoryItems"
                v-model="invId"
                item-title="name"
                item-value="id"
                density="compact"
                hide-details
              ></v-select>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field
                v-model="table.search"
                :label="$t('label.search')"
                :prepend-inner-icon="mdiMagnify"
                hide-details
                density="compact"
                single-line
              ></v-text-field>
            </v-col>
          </v-row>
        </template>

        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.gender="{ item }">
          {{ $t(renderGender(item.gender)) }}
        </template>

        <template v-slot:item.totalQuantity="{ item }">
          {{ $t('label.pairs', item.totalQuantity) }}
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import dayjs from 'dayjs';
import { mdiMagnify, mdiWarehouse } from '@mdi/js';
import { useQuery } from 'villus';
import {
  GetInventoriesDocument,
  GetSalePerformanceDocument,
} from '~/api/generated/types';

const { t } = useI18n();
const authStore = useAuthStore();

const now = dayjs();
const findStart = now.startOf('month');
const findEnd = now.endOf('month');

const dates = ref<string[]>([]);
let currentDate = findStart.clone();
while (currentDate.isBefore(findEnd)) {
  dates.value.push(currentDate.format('YYYY-MM-DD'));
  currentDate = currentDate.add(1, 'day');
}

const form = reactive({
  startDate: findStart.toISOString(),
  endDate: findEnd.toISOString(),
});

const invId = ref<string | null>(null);

const { data: inventoriesData } = useQuery({
  query: GetInventoriesDocument,
  tags: [CACHE_INVENTORIES],
});

const inventoryItems = computed(() => [
  { id: null, name: t('label.all_inventories') },
  ...(inventoriesData.value?.getInventories ?? []),
]);

const table = reactive({
  search: '',
  page: 1,
  itemsPerPage: 10,
  headers: [
    { title: t('label.sku'), key: 'sku' },
    { title: t('label.name'), key: 'productGroupName' },
    { title: t('label.product_category'), key: 'productCategoryName' },
    { title: t('label.gender'), key: 'gender' },
    { title: t('label.quantity'), key: 'totalQuantity', align: 'end' },
  ] as const,
});

const { execute, data, isFetching, error } = useQuery({
  query: GetSalePerformanceDocument,
  cachePolicy: 'network-only',
  tags: [CACHE_SALE_PERFORMANCE],
  variables: computed(() => ({
    startDate: form.startDate,
    endDate: form.endDate,
    invId: invId.value ?? undefined,
  })),
});

const totalQuantitySold = computed(() => {
  return (
    data.value?.getSalePerformance.reduce(
      (sum, item) => sum + item.totalQuantity,
      0,
    ) ?? 0
  );
});

function manageDates(newDates: string[] | string) {
  form.startDate = newDates[0] ?? '';
  form.endDate = newDates[newDates.length - 1] ?? '';
  execute();
}

watch(invId, () => {
  execute();
});
</script>
