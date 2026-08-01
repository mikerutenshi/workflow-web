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
            <v-col>
              <v-select
                :label="$t('label.select_inventories')"
                :prepend-inner-icon="mdiWarehouse"
                :items="authStore.user?.userInventories"
                v-model="invId"
                item-title="name"
                item-value="id"
                density="compact"
                hide-details
              ></v-select>
            </v-col>
            <v-col>
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

        <template v-slot:item.actions="{ item }">
          <v-btn
            :icon="mdiMagnifyExpand"
            @click="showDialog(DialogContent.View, item.id)"
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
      :inventory-id="invId"
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
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import { DeleteSaleDocument, GetSalesDocument } from '~/api/generated/types';

const { t } = useI18n();
const adapter = useDate();
const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 99;

enum DialogContent {
  View = 'VIEW',
  None = 'NONE',
  Edit = 'EDIT',
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
    { title: '', key: 'actions', sortable: false, align: 'end' },
  ] as const,
});
const salesVariables = ref({
  invId: null as string | null,
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
  paused: ({ invId }) => !invId,
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
    salesVariables.value.invId = newInvId;
  },
  { immediate: true },
);

function showDialog(content: DialogContent, saleId?: string) {
  dialog.saleId = saleId ?? null;

  switch (content) {
    case DialogContent.Edit:
      dialog.content = DialogContent.Edit;
      dialog.title = t('page.sale_edit');
      dialog.isReadonly = false;
      dialog.isVisible = true;
      break;
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
</script>
