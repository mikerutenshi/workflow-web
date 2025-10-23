<template>
  <v-row v-if="invTrfsError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(invTrfsError) }}
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
        :items="invTrfsData?.getInvTrfs"
        :search="search"
        :loading="isFetchingInvTrfs"
        item-value="id"
        fixed-header
        :height="`calc(100vh - 240px)`"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.trfDate="{ item }">
          {{ adapter.format(item.trfDate, 'fullDateTime12h') }}
        </template>

        <template v-slot:item.invTrfItems="{ item }">
          {{
            item.invTrfItems.reduce(
              (sum, itemSize) =>
                sum +
                itemSize.invTrfItemSizes.reduce(
                  (innerSum, size) => innerSum + size.quantity,
                  0,
                ),
              0,
            )
          }}
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            :icon="mdiFileDocumentArrowRightOutline"
            variant="text"
            @click="showItemDialog(item as InvTrfDto)"
          ></v-btn>
        </template>
      </v-data-table>
    </v-col>

    <v-dialog v-model="viewDialog" max-width="1200px">
      <v-card>
        <v-toolbar>
          <v-toolbar-title
            >Transfer Item Details for
            {{ selectItemObject?.trfNo }}</v-toolbar-title
          >
        </v-toolbar>
        <v-container class="d-flex flex-column">
          <InvProductTrfItemTable
            :inv-trf-dto="selectItemObject"
          ></InvProductTrfItemTable>
        </v-container>
      </v-card>
    </v-dialog>
  </v-row>

  <ActionEditItemDialog
    :dialogTitle="
      selectItemObject ? $t('page.inv_trf_edit') : $t('page.inv_trf_create')
    "
    v-model="formDialog"
  >
    <InvProductTrfForm @close-dialog="formDialog = false"></InvProductTrfForm>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiFileDocumentArrowRightOutline, mdiMagnify } from '@mdi/js';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import { GetInvTrfsDocument, type InvTrfDto } from '~/api/generated/types';
import InvProductTrfItemTable from './InvProductTrfItemTable.vue';

const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');
const viewDialog = ref(false);
const formDialog = ref(false);

const dialogStore = useDialogStore();
const { isFormDialogOpen: isCreateDialogOpen } = storeToRefs(dialogStore);

const selectItemObject = shallowRef<InvTrfDto | null>(null);

const {
  execute: executeFetch,
  data: invTrfsData,
  isFetching: isFetchingInvTrfs,
  error: invTrfsError,
} = useQuery({
  query: GetInvTrfsDocument,
  tags: [CACHE_INV_TRFS],
});

const { t } = useI18n();
const adapter = useDate();

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  { title: t('label.trf_date'), key: 'trfDate' },
  { title: t('label.trf_no'), key: 'trfNo' },
  { title: t('label.from_inv'), key: 'fromInv.name' },
  { title: t('label.to_inv'), key: 'toInv.name' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.quantity'), key: 'invTrfItems' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

function showItemDialog(item: InvTrfDto) {
  viewDialog.value = true;
  selectItemObject.value = item;
}

watch(isCreateDialogOpen, (isOpen) => {
  if (isOpen) {
    formDialog.value = true;
  }
});
watch(formDialog, (isOpen) => {
  if (!isOpen) {
    executeFetch();
    dialogStore.closeFormDialog();
    selectItemObject.value = null;
  }
});
watch(viewDialog, (isOpen) => {
  if (!isOpen) {
    setTimeout(() => {
      selectItemObject.value = null;
    }, 200);
  }
});
watchEffect(() => {
  console.log(`selectItemObject: ${JSON.stringify(selectItemObject.value)}`);
});
</script>
