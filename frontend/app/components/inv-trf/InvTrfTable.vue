<template>
  <v-row v-if="invTrfsError || deleteError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(invTrfsError || deleteError) }}
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

        <!-- <template v-slot:item.invTrfItems="{ item }">
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
          </template> -->

        <template #item.progress="{ item }">{{
          $t(`progress.${item.progress}`)
        }}</template>

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
              <!-- <v-list-item
                  :prepend-icon="mdiFileDocumentArrowRightOutline"
                  @click="showItemDialog(item as InvTrfDto)"
                >
                  <v-list-item-title>{{
                    $t('label.show_item_detail')
                  }}</v-list-item-title>
                </v-list-item> -->
              <v-list-item
                :prepend-icon="mdiPencil"
                @click="showDialog(DialogContent.Edit, item.id)"
              >
                <v-list-item-title>{{ t('btn.update') }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                :prepend-icon="mdiPrinter"
                @click="showDialog(DialogContent.View, item.id)"
              >
                <v-list-item-title>{{ t('btn.print') }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                :prepend-icon="mdiTrashCan"
                @click="showDeleteDialog(item.id)"
                class="text-error"
              >
                <v-list-item-title>{{ t('btn.delete') }}</v-list-item-title>
              </v-list-item>
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
    <InvTrfForm
      @close-dialog="closeDialog"
      :inv-trf-id="dialogModel.id"
      :is-readonly="dialogModel.isReadonly"
    ></InvTrfForm>
  </ActionEditItemDialog>

  <ActionConfirmDeleteDialog
    v-model="confirmDeleteDialog"
    @confirm="if (dialogModel.id) executeDelete({ id: dialogModel.id });"
    :loading="isDeleting"
  ></ActionConfirmDeleteDialog>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @on-confirm="confirmDeleteDialog = false"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiMagnify,
  mdiPencil,
  mdiPrinter,
  mdiTrashCan,
} from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteInvTrfDocument,
  GetInvTrfsDocument,
  type InvTrfDto,
} from '~/api/generated/types';
const { t } = useI18n();
const adapter = useDate();

const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');
enum DialogContent {
  View = 'VIEW',
  None = 'NONE',
  Edit = 'EDIT',
  Create = 'CREATE',
}
const dialogModel = reactive({
  id: null as string | null,
  title: '',
  content: DialogContent.None,
  isVisible: false,
  isReadonly: false,
});

const selectItemObject = shallowRef<InvTrfDto | null>(null);
const confirmDeleteDialog = ref(false);
const snack = reactive({
  isVisible: false,
  message: t('status.deleted'),
  color: SnackColor.Success,
});

const {
  execute: executeFetch,
  data: invTrfsData,
  isFetching: isFetchingInvTrfs,
  error: invTrfsError,
} = useQuery({
  query: GetInvTrfsDocument,
  tags: [CACHE_INV_TRFS],
});

const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteInvTrfDocument, {
  onData(data) {
    snack.message = t('status.deleted');
    snack.isVisible = true;
    executeFetch();
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
  // { title: t('label.quantity'), key: 'invTrfItems' },
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
function closeDialog() {
  dialogModel.isVisible = false;
  executeFetch();
}

function showDeleteDialog(invTrfId: string) {
  dialogModel.id = invTrfId;
  confirmDeleteDialog.value = true;
}

watchEffect(() => {
  console.log(`selectItemObject: ${JSON.stringify(selectItemObject.value)}`);
});
</script>
