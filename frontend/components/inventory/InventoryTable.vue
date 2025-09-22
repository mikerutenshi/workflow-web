<template>
  <v-row v-if="error" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(error) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row class="flex-grow-0">
    <v-col>
      <v-text-field
        v-model="search"
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
        :headers="headers"
        :items="data?.getInventories"
        :search="search"
        :loading="isFetching"
        item-value="id"
        class="flex-grow-1"
        hover
        fixed-header
        :height="`calc(100vh - 240px)`"
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            :prepend-icon="mdiPencil"
            variant="text"
            @click="edit(item.id)"
          ></v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog
    :dialogTitle="
      selectedInventoryId
        ? $t('page.inventory_edit')
        : $t('page.inventory_create')
    "
    v-model="dialog"
  >
    <InventoryCreateForm
      :inventoryId="selectedInventoryId"
    ></InventoryCreateForm>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiPencil } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteInventoryDocument,
  GetInventoriesDocument,
} from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data, isFetching, error } = useQuery({
  query: GetInventoriesDocument,
  tags: [CACHE_INVENTORIES],
});

const { t } = useI18n();
const headers: ReadOnlyHeaders = [
  // { title: t('label.id'), key: 'id' },
  { title: t('label.sku'), key: 'name' },
  { title: t('label.address'), key: 'address' },
  { title: t('label.city'), key: 'city' },
  { title: t('label.province'), key: 'province' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
const search = ref('');
const pageNo = ref(1);
const itemsPerPage = ref(25);
const dialog = ref(false);
const selectedInventoryId = ref<string | null>(null);
const dialogStore = useDialogStore();
const { isFormDialogOpen: isCreateDialogOpen } = storeToRefs(dialogStore);

function edit(workId: string) {
  dialog.value = true;
  selectedInventoryId.value = workId;
}

watch(isCreateDialogOpen, (isOpen) => {
  if (isOpen) {
    dialog.value = true;
  }
});
watch(dialog, (isOpen) => {
  if (!isOpen) {
    dialogStore.closeFormDialog();
    selectedInventoryId.value = '';
  }
});
</script>
