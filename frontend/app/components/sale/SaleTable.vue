<template>
  <v-row v-if="errorSales" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(errorSales) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="table.headers"
        :items="salesData?.getSales"
        :search="table.search"
        :loading="isFetchingSales"
        item-value="id"
        fixed-header
        :height="`calc(100vh - 215px)`"
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

        <template v-slot:item.date="{ item }">
          {{ adapter.format(item.date, 'fullDateTime12h') }}
        </template>

        <template v-slot:item.inventory="{ item }">
          {{ item.saleItems[0]?.inventory.name }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            :icon="mdiMagnifyExpand"
            @click="
              showDialog(DialogContent.View, item.id, item.saleItems[0]?.invId)
            "
            variant="text"
          >
          </v-btn>
          <v-btn
            v-if="clearanceLevel <= Role.Superuser"
            :icon="mdiTrashCan"
            @click="deleteItem(item.id)"
            variant="text"
            class="text-error"
          >
          </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog :dialogTitle="dialog.title" v-model="dialog.isVisible">
    <SaleCreateForm
      :inventory-id="dialog.inventoryId"
      :sale-id="dialog.saleId"
      @form-submit="dialog.isVisible = false"
      :is-readonly="dialog.isReadonly"
    ></SaleCreateForm>
  </ActionEditItemDialog>

  <ActionConfirmActionDialog
    v-model="confirmDeleteDialog"
    @confirm="if (dialog.saleId) executeDelete({ id: dialog.saleId });"
  ></ActionConfirmActionDialog>
</template>

<script setup lang="ts">
import {
  mdiMagnify,
  mdiMagnifyExpand,
  mdiTrashCan,
  mdiWarehouse,
} from '@mdi/js';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import { DeleteSaleDocument, GetSalesDocument } from '~/api/generated/types';

const { t } = useI18n();
const adapter = useDate();
const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 99;

const now = dayjs();
const findStart = now.startOf('month');
const findEnd = now.endOf('month');

const dates = ref<string[]>([]);
let currentDate = findStart.clone();
while (currentDate.isBefore(findEnd)) {
  dates.value.push(currentDate.format('YYYY-MM-DD'));
  currentDate = currentDate.add(1, 'day');
}

const inventoryItems = computed(() => [
  { id: null, name: t('label.all_inventories') },
  ...(authStore.user?.userInventories ?? []),
]);

enum DialogContent {
  View = 'VIEW',
  None = 'NONE',
  Create = 'CREATE',
}
const dialog = reactive({
  inventoryId: null as string | null,
  saleId: null as string | null,
  title: '',
  content: DialogContent.None,
  isVisible: false,
  isReadonly: false,
});
const confirmDeleteDialog = ref(false);
const invId = ref<string | null>(
  authStore.user?.userInventories.at(0)?.id ?? null,
);
const table = reactive({
  search: '',
  page: 1,
  itemsPerPage: 25,
  headers: [
    { title: t('label.date'), key: 'date' },
    { title: t('label.sale_no'), key: 'saleNo' },
    { title: t('label.inventory'), key: 'inventory', sortable: false },
    { title: '', key: 'actions', sortable: false, align: 'end' },
  ] as const,
});
const salesVariables = ref({
  invId: undefined as string | undefined,
  startDate: findStart.toISOString(),
  endDate: findEnd.toISOString(),
});
const {
  execute: fetchSales,
  data: salesData,
  isFetching: isFetchingSales,
  error: errorSales,
} = useQuery({
  query: GetSalesDocument,
  variables: salesVariables,
  tags: [CACHE_SALES],
  fetchOnMount: false,
  paused: () => (authStore.user?.userInventories.length ?? 0) === 0,
});

const snack = useSnackbarStore();
const {
  execute: executeDelete,
  error: errorDelete,
  isFetching: isDeleting,
} = useMutation(DeleteSaleDocument, {
  onData(data) {
    snack.show(t('status.saved'), SnackColor.Success);
    fetchSales();
  },
  refetchTags: [CACHE_SALES, CACHE_INV_PRODUCTS],
});

const saleStore = useSaleStore();

watch(
  invId,
  (id) => {
    saleStore.selectedInventoryId = id;
  },
  { immediate: true },
);

watch(
  () => [dialog.isVisible, dialog.content],
  ([visible]) => {
    if (!visible) fetchSales();
  },
);
watch(
  () => dialog.content,
  (newValue, oldValue) => {
    if (newValue != oldValue) {
      saleStore.sale = null;
    }
  },
);
watch(
  invId,
  (newInvId) => {
    salesVariables.value.invId = newInvId ?? undefined;
  },
  { immediate: true },
);

function showDialog(
  content: DialogContent,
  saleId?: string,
  invId?: string | null,
) {
  dialog.saleId = saleId ?? null;
  dialog.inventoryId = invId ?? null;

  switch (content) {
    case DialogContent.View:
      dialog.content = DialogContent.View;
      dialog.title = t('page.sale_view');
      dialog.isReadonly = true;
      dialog.isVisible = true;
      break;
  }
}

function deleteItem(saleId: string) {
  dialog.saleId = saleId;
  confirmDeleteDialog.value = true;
}

function manageDates(newDates: string[] | string) {
  salesVariables.value.startDate = newDates[0] ?? '';
  salesVariables.value.endDate = newDates[newDates.length - 1] ?? '';
  fetchSales();
}
</script>
