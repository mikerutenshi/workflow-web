<template>
  <v-row v-if="errorSales || errorInventories" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(errorSales || errorInventories) }}
      </v-alert>
    </v-col>
  </v-row>
  <v-row class="flex-grow-0">
    <v-col>
      <v-select
        :label="$t('label.select_inventories')"
        :prepend-inner-icon="mdiWarehouse"
        :items="dataInventories?.getInventories"
        v-model="inventoryId"
        item-title="name"
        item-value="id"
        :loading="isFetchingInventories"
      ></v-select>
    </v-col>
    <v-col>
      <v-text-field
        v-model="table.search"
        :label="$t('label.search')"
        :prepend-inner-icon="mdiMagnify"
        hide-details
        single-line
      ></v-text-field>
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
        class="flex-grow-1"
        fixed-header
        :height="`calc(100vh - 262px)`"
        hover
        :page="table.page"
        :items-per-page="table.itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog :dialogTitle="dialog.title" v-model="dialog.isVisible">
    <SaleCreateForm :inventory-id="inventoryId"></SaleCreateForm>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiWarehouse } from '@mdi/js';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import {
  GetInventoriesDocument,
  GetSalesDocument,
} from '~/api/generated/types';

const { t } = useI18n();
const adapter = useDate();

const dialogStore = useDialogStore();
const { isFormDialogOpen } = storeToRefs(dialogStore);
enum DialogContent {
  View = 'VIEW',
  None = 'NONE',
  Edit = 'EDIT',
  Create = 'CREATE',
}
const dialog = reactive({
  payloadId: null as string | null,
  title: '',
  content: DialogContent.None,
  isVisible: false,
  isReadonly: false,
});
const inventoryId = ref('');
const table = reactive({
  search: '',
  page: 1,
  itemsPerPage: 25,
  headers: [
    { title: t('label.date'), key: 'date' },

    { title: t('label.sale_no'), key: 'sale_no' },
  ],
});

const {
  data: dataInventories,
  isFetching: isFetchingInventories,
  error: errorInventories,
} = useQuery({
  query: GetInventoriesDocument,
  tags: [CACHE_INVENTORIES],
  onData(data) {
    let firstItem = data.getInventories.at(0);
    if (firstItem) {
      inventoryId.value = firstItem.id;
    }
  },
});
const {
  execute: executeFetch,
  data: salesData,
  isFetching: isFetchingSales,
  error: errorSales,
} = useQuery({
  query: GetSalesDocument,
  tags: [CACHE_SALES],
});

watch(isFormDialogOpen, (isOpen) => {
  if (isOpen) {
    showDialog(DialogContent.Create);
  }
});
watch(
  () => [dialog.isVisible, dialog.content],
  ([visible, content]) => {
    if (!visible && content === DialogContent.Create) {
      // executeFetch();
      dialogStore.closeFormDialog();
    }
  },
);

function showDialog(content: DialogContent, payloadId?: string | undefined) {
  dialog.payloadId = payloadId ?? null;

  switch (content) {
    case DialogContent.Create:
      dialog.content = DialogContent.Create;
      dialog.title = t('page.sale_create');
      dialog.isReadonly = false;
      dialog.isVisible = true;
      break;
    case DialogContent.Edit:
      dialog.content = DialogContent.Edit;
      dialog.title = t('page.sale_edit');
      dialog.isReadonly = false;
      dialog.isVisible = true;
      break;
    // case DialogContent.View:
    //   dialog.content = DialogContent.View;
    //   dialog.title = t('page.sale_view');
    //   dialog.isReadonly = true;
    //   dialog.isVisible = true;
    //   break;
  }
}
</script>
