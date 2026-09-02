<template>
  <v-row v-if="invAdjsError || deleteError || postError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(invAdjsError || deleteError || postError) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="invAdjsData?.getInvAdjs"
        :search="search"
        :loading="isFetchingInvAdjs"
        item-value="id"
        fixed-header
        :height="`calc(100vh - 215px)`"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #top>
          <v-row class="mx-4 my-2">
            <v-col cols="12" sm="6">
              <v-select
                :label="$t('label.select_inventories')"
                :prepend-inner-icon="mdiWarehouse"
                :items="inventoryOptions"
                v-model="selectInvId"
                item-title="name"
                item-value="id"
                hide-details
                density="compact"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6">
              <v-text-field
                v-model="search"
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

        <template v-slot:item.adjDate="{ item }">
          {{ adapter.format(item.adjDate, 'fullDateTime12h') }}
        </template>

        <template #item.progress="{ item }">
          <v-icon :icon="renderProgressIcon(item.progress)"></v-icon>
          <span>{{ $t(`progress.${item.progress}`) }}</span>
        </template>

        <template #item.itemCount="{ item }">{{
          $t('label.items_counted', item.itemCount)
        }}</template>

        <template #item.totalVariance="{ item }">
          <span :class="varianceClass(item.totalVariance)">
            {{ formatVariance(item.totalVariance) }}
          </span>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-menu transition="slide-y-transition" open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn
                :icon="mdiDotsVertical"
                color="primary"
                v-bind="props"
                variant="text"
              >
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                :prepend-icon="mdiMagnifyExpand"
                @click="showDialog(DialogContent.View, item.id)"
                :title="t('page.inv_adj_view')"
              ></v-list-item>

              <template v-if="item.progress !== Progress.Completed">
                <v-list-item
                  v-if="canModify(item)"
                  :prepend-icon="mdiPencil"
                  @click="showDialog(DialogContent.Edit, item.id)"
                  :title="t('btn.update')"
                ></v-list-item>

                <v-list-item
                  v-if="clearanceLevel <= Role.Finance"
                  :prepend-icon="mdiCheckDecagram"
                  @click="showPostDialog(item.id)"
                  :title="t('btn.post_adjustment')"
                ></v-list-item>

                <v-divider></v-divider>

                <v-list-item
                  v-if="canModify(item)"
                  :prepend-icon="mdiTrashCan"
                  @click="showDeleteDialog(item.id)"
                  class="text-error"
                  :title="t('btn.delete')"
                ></v-list-item>
              </template>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog
    :dialogTitle="dialogModel.title"
    v-model="dialogModel.isVisible"
  >
    <InvAdjForm
      v-if="
        dialogModel.content === DialogContent.Edit ||
        dialogModel.content === DialogContent.View
      "
      @form-submit="closeDialog"
      :inv-adj-id="dialogModel.id"
      :is-readonly="dialogModel.isReadonly"
    ></InvAdjForm>
  </ActionEditItemDialog>

  <ActionConfirmActionDialog
    v-model="confirmDeleteDialog"
    @confirm="if (dialogModel.id) executeDelete({ id: dialogModel.id });"
    :loading="isDeleting"
  ></ActionConfirmActionDialog>

  <ActionConfirmActionDialog
    v-model="confirmPostDialog"
    action-type="ADJUST"
    @confirm="if (dialogModel.id) executePost({ id: dialogModel.id });"
    :loading="isPosting"
  ></ActionConfirmActionDialog>
</template>

<script setup lang="ts">
import {
  mdiCheckDecagram,
  mdiDotsVertical,
  mdiMagnify,
  mdiMagnifyExpand,
  mdiPencil,
  mdiTrashCan,
  mdiWarehouse,
} from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteInvAdjDocument,
  GetInvAdjsDocument,
  PostInvAdjDocument,
  Progress,
} from '~/api/generated/types';

const { t } = useI18n();
const adapter = useDate();
const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 99;

// Mirrors assertOwned in inv-adj.service.ts: below Planner a count sheet may
// only be changed by whoever created it, so one store cannot rewrite another's.
function canModify(item: { createdBy: string }) {
  return (
    clearanceLevel <= Role.Planner || item.createdBy === authStore.user?.id
  );
}

const ALL_INVENTORIES = '';
const inventoryOptions = computed(() => [
  { id: ALL_INVENTORIES, name: t('label.all_inventories') },
  ...(authStore.user?.userInventories ?? []),
]);
// Defaults to a real warehouse so the app-bar New button is usable on arrival;
// "All Warehouses" is a deliberate choice that hides it.
const selectInvId = ref<string>(
  authStore.user?.userInventories.at(0)?.id ?? ALL_INVENTORIES,
);

// A count sheet targets exactly one warehouse, so the layout needs to know which
// one this table is showing to gate the New button and seed the create form.
const invAdjStore = useInvAdjStore();
watch(
  selectInvId,
  (id) => {
    invAdjStore.selectedInventoryId = id === ALL_INVENTORIES ? null : id;
  },
  { immediate: true },
);

const pageNo = ref(1);
const itemsPerPage = ref(25);
const search = ref('');

enum DialogContent {
  View = 'VIEW',
  None = 'NONE',
  Edit = 'EDIT',
}
const dialogModel = reactive({
  id: null as string | null,
  title: '',
  content: DialogContent.None,
  isVisible: false,
  isReadonly: false,
});
const confirmDeleteDialog = ref(false);
const confirmPostDialog = ref(false);

const {
  data: invAdjsData,
  isFetching: isFetchingInvAdjs,
  error: invAdjsError,
} = useQuery({
  query: GetInvAdjsDocument,
  variables: computed(() => ({
    invId:
      selectInvId.value === ALL_INVENTORIES ? undefined : selectInvId.value,
  })),
  tags: [CACHE_INV_ADJS],
});

const snack = useSnackbarStore();
const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteInvAdjDocument, {
  onData() {
    snack.show(t('status.deleted'), SnackColor.Success);
  },
  refetchTags: [CACHE_INV_ADJS, CACHE_INV_ADJ],
});

// Posting is the step that writes stock, so it also invalidates the stock list
// and every open per-product ledger.
const {
  execute: executePost,
  error: postError,
  isFetching: isPosting,
} = useMutation(PostInvAdjDocument, {
  onData() {
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [
    CACHE_INV_ADJS,
    CACHE_INV_ADJ,
    CACHE_INV_PRODUCTS,
    CACHE_INV_TXS,
  ],
});

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  { title: t('label.adj_date'), key: 'adjDate' },
  { title: t('label.adj_no'), key: 'adjNo' },
  { title: t('label.inventory'), key: 'inventory.name' },
  { title: t('label.product'), key: 'itemCount' },
  { title: t('label.total_variance'), key: 'totalVariance' },
  { title: t('label.status'), key: 'progress' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

function formatVariance(value: number) {
  return value > 0 ? `+${value}` : `${value}`;
}
function varianceClass(value: number) {
  if (value > 0) return 'text-success';
  if (value < 0) return 'text-error';
  return '';
}

function showDialog(content: DialogContent, id?: string) {
  dialogModel.id = id ?? null;

  switch (content) {
    case DialogContent.Edit:
      dialogModel.content = DialogContent.Edit;
      dialogModel.title = t('page.inv_adj_edit');
      dialogModel.isReadonly = false;
      dialogModel.isVisible = true;
      break;
    case DialogContent.View:
      dialogModel.content = DialogContent.View;
      dialogModel.title = t('page.inv_adj_view');
      dialogModel.isReadonly = true;
      dialogModel.isVisible = true;
      break;
  }
}
function closeDialog() {
  dialogModel.isVisible = false;
}
function showDeleteDialog(invAdjId: string) {
  dialogModel.id = invAdjId;
  confirmDeleteDialog.value = true;
}
function showPostDialog(invAdjId: string) {
  dialogModel.id = invAdjId;
  confirmPostDialog.value = true;
}
</script>
