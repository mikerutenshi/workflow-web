<template>
  <v-row v-if="invTrfsError || deleteError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(invTrfsError || deleteError) }}
      </v-alert>
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
        :height="`calc(100vh - 215px)`"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #top>
          <v-text-field
            v-model="search"
            :label="$t('label.search')"
            :prepend-inner-icon="mdiMagnify"
            hide-details
            density="compact"
            single-line
            class="mx-4 my-2"
          ></v-text-field>
        </template>
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.trfDate="{ item }">
          {{ adapter.format(item.trfDate, 'fullDateTime12h') }}
        </template>

        <template #item.progress="{ item }">{{
          $t(`progress.${item.progress}`)
        }}</template>

        <template v-slot:item.actions="{ item }">
          <template
            v-if="
              item.fromInv &&
              userInventories.find((inv) => inv.id == item.fromInv?.id)
            "
          >
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
                  :prepend-icon="mdiPencil"
                  @click="showDialog(DialogContent.Edit, item.id)"
                >
                  <v-list-item-title>{{ t('btn.update') }}</v-list-item-title>
                </v-list-item>
                <ActionPrintInvTrf :inv-trf-id="item.id"> </ActionPrintInvTrf>
                <v-divider></v-divider>
                <v-list-item
                  v-if="item.progress === Progress.Initiated"
                  :prepend-icon="mdiTrashCan"
                  @click="showDeleteDialog(item.id)"
                  class="text-error"
                >
                  <v-list-item-title>{{ t('btn.delete') }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
          <template
            v-else-if="
              item.fromInv &&
              userInventories.find((inv) => inv.id == item.toInv.id)
            "
          >
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
                ></v-list-item>
                <v-list-item
                  v-if="item.progress !== Progress.Completed"
                  :prepend-icon="mdiPencil"
                  @click="showEditProgressDialog(item)"
                  title="Change status"
                ></v-list-item>
              </v-list>
            </v-menu>
          </template>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog
    :dialogTitle="dialogModel.title"
    v-model="dialogModel.isVisible"
  >
    <InvTrfForm
      v-if="
        dialogModel.content === DialogContent.Edit ||
        dialogModel.content === DialogContent.View
      "
      @form-submit="closeDialog"
      :inv-trf-id="dialogModel.id"
      :is-readonly="dialogModel.isReadonly"
    ></InvTrfForm>
    <InvTrfUpdateProgressForm
      v-if="dialogModel.content === DialogContent.EditProgress"
      :inv-trf-dto="selectItemObject"
      @form-submit="closeDialog"
    ></InvTrfUpdateProgressForm>
  </ActionEditItemDialog>

  <ActionConfirmActionDialog
    v-model="confirmDeleteDialog"
    @confirm="if (dialogModel.id) executeDelete({ id: dialogModel.id });"
    :loading="isDeleting"
  ></ActionConfirmActionDialog>
</template>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiMagnify,
  mdiMagnifyExpand,
  mdiPencil,
  mdiTrashCan,
} from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteInvTrfDocument,
  GetInvTrfsDocument,
  Progress,
  type InvTrfSimpleDto,
} from '~/api/generated/types';

export type InvTrfTableRow = {
  id: string;
  trfNo: string;
  progress: Progress;
};
const { t } = useI18n();
const adapter = useDate();
const authStore = useAuthStore();
const userInventories = authStore.user?.userInventories ?? [];

const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');
enum DialogContent {
  View = 'VIEW',
  None = 'NONE',
  Edit = 'EDIT',
  EditProgress = 'EDIT_PROGRESS',
  Create = 'CREATE',
}
const dialogModel = reactive({
  id: null as string | null,
  title: '',
  content: DialogContent.None,
  isVisible: false,
  isReadonly: false,
});

const selectItemObject = shallowRef<InvTrfTableRow | null>(null);
const confirmDeleteDialog = ref(false);
const {
  data: invTrfsData,
  isFetching: isFetchingInvTrfs,
  error: invTrfsError,
} = useQuery({
  query: GetInvTrfsDocument,
  tags: [CACHE_INV_TRFS],
});

const snack = useSnackbarStore();
const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteInvTrfDocument, {
  onData(data) {
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_INV_TRFS, CACHE_INV_TRF, CACHE_INV_TRFS_PER_ITEM],
});

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  { title: t('label.trf_date'), key: 'trfDate' },
  { title: t('label.trf_no'), key: 'trfNo' },
  { title: t('label.order_no'), key: 'work.orderNo' },
  { title: t('label.from_inv'), key: 'fromInv.name' },
  { title: t('label.to_inv'), key: 'toInv.name' },
  { title: t('label.status'), key: 'progress' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

function showDialog(content: DialogContent, id?: string | undefined) {
  dialogModel.id = id ?? null;

  switch (content) {
    case DialogContent.Edit:
      dialogModel.content = DialogContent.Edit;
      dialogModel.title = t('page.inv_trf_edit');
      dialogModel.isReadonly = false;
      dialogModel.isVisible = true;
      break;
    case DialogContent.View:
      dialogModel.content = DialogContent.View;
      dialogModel.title = t('page.inv_trf_view');
      dialogModel.isReadonly = true;
      dialogModel.isVisible = true;
      break;
  }
}

function showEditProgressDialog(dto: InvTrfTableRow) {
  if (dto) {
    selectItemObject.value = dto;
    dialogModel.content = DialogContent.EditProgress;
    dialogModel.title = 'Edit Progress';
    dialogModel.isVisible = true;
  }
}
function closeDialog() {
  dialogModel.isVisible = false;
}

function showDeleteDialog(invTrfId: string) {
  dialogModel.id = invTrfId;
  confirmDeleteDialog.value = true;
}
</script>
