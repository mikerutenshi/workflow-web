<template>
  <template v-if="isComingSoon">
    <ComingSoon></ComingSoon>
  </template>
  <template v-else>
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
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- <v-dialog v-model="dialogView" max-width="1200px">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>
            {{
              t('page.item_detail_for', { item: selectItemObject?.trfNo })
            }}</v-toolbar-title
          >
        </v-toolbar>
        <v-container class="d-flex flex-column">
          <InvProductTrfItemTable
            :inv-trf-dto="selectItemObject"
          ></InvProductTrfItemTable>
        </v-container>
      </v-card>
    </v-dialog> -->

    <ActionEditItemDialog
      :dialogTitle="dialogModel.title"
      v-model="dialogModel.isVisible"
    >
      <InvProductTrfForm
        @close-dialog="dialogModel.isVisible = false"
        :inv-trf-id="dialogModel.id"
        :is-readonly="dialogModel.isReadonly"
      ></InvProductTrfForm>
    </ActionEditItemDialog>
  </template>
</template>

<script setup lang="ts">
import { mdiDotsVertical, mdiMagnify, mdiPencil, mdiPrinter } from '@mdi/js';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import { GetInvTrfsDocument, type InvTrfDto } from '~/api/generated/types';

const authStore = useAuthStore();
const clearance = authStore.user?.role.clearanceLevel ?? 6;
const isComingSoon = computed(() => {
  return clearance > Role.Superuser;
});
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
    case DialogContent.Create:
      dialogModel.content = DialogContent.Create;
      dialogModel.title = t('page.inv_trf_create');
      dialogModel.isReadonly = false;
      dialogModel.isVisible = true;
      break;
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

watch(isCreateDialogOpen, (open) => {
  if (open) {
    showDialog(DialogContent.Create);
  }
});
watch(
  () => [dialogModel.isVisible, dialogModel.content],
  ([visible, content]) => {
    if (!visible && content === DialogContent.Create) {
      executeFetch();
      dialogStore.closeFormDialog();
    }
  },
);

watchEffect(() => {
  console.log(`selectItemObject: ${JSON.stringify(selectItemObject.value)}`);
});
</script>
