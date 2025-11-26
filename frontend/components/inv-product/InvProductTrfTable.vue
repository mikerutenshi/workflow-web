<template>
  <template v-if="isComingSoon">
    <ComingSoon></ComingSoon>
  </template>
  <template v-else>
    <v-row
      v-if="invTrfsError || fromInvError || toInvError"
      class="flex-grow-0"
    >
      <v-col>
        <v-alert type="error">
          {{ extractGraphQlError(invTrfsError || fromInvError || toInvError) }}
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
                  @click="showItemFormDialog(item as InvTrfDto)"
                >
                  <v-list-item-title>{{ t('btn.update') }}</v-list-item-title>
                </v-list-item>
                <v-list-item
                  :prepend-icon="mdiPrinter"
                  @click="printItem(item as InvTrfDto)"
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
      :dialogTitle="
        selectItemObject ? $t('page.inv_trf_edit') : $t('page.inv_trf_create')
      "
      v-model="dialogForm"
    >
      <InvProductTrfForm
        @close-dialog="dialogForm = false"
        :inv-trf-id="selectItemObject?.id || null"
      ></InvProductTrfForm>
    </ActionEditItemDialog>
  </template>
</template>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiFileDocumentArrowRightOutline,
  mdiMagnify,
  mdiPencil,
  mdiPrinter,
} from '@mdi/js';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  GetInventoryDocument,
  GetInvTrfsDocument,
  type InvTrfDto,
} from '~/api/generated/types';
import InvProductTrfItemTable from './InvProductTrfItemTable.vue';
import jsPDF from 'jspdf';

const authStore = useAuthStore();
const clearance = authStore.user?.role.clearanceLevel ?? 6;
const isComingSoon = computed(() => {
  return clearance > Role.Superuser;
});
const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');
const dialogView = ref(false);
const dialogForm = ref(false);

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
const fromInvVar = ref({ id: '' });
const {
  execute: fetchFromInv,
  data: fromInvData,
  isFetching: isFetchingFromInv,
  error: fromInvError,
} = useQuery({
  query: GetInventoryDocument,
  variables: fromInvVar,
  fetchOnMount: false,
  tags: [CACHE_FROM_INV],
});
const toInvVar = ref({ id: '' });
const {
  execute: fetchInventory,
  data: toInvData,
  isFetching: isFetcingToInv,
  error: toInvError,
} = useQuery({
  query: GetInventoryDocument,
  variables: toInvVar,
  fetchOnMount: false,
  tags: [CACHE_TO_INV],
});
const isPrinting = ref(false);

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

function showItemDialog(item: InvTrfDto) {
  selectItemObject.value = item;
  dialogView.value = true;
}
function showItemFormDialog(item: InvTrfDto) {
  selectItemObject.value = item;
  dialogForm.value = true;
}
function printItem(item: InvTrfDto) {
  selectItemObject.value = item;
  fromInvVar.value.id = item.fromInv!.id;
  toInvVar.value.id = item.toInv!.id;
  isPrinting.value = true;
}
function exportPdf() {
  const doc = new jsPDF();
  doc.setLineHeightFactor(1.5);
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const pageMargin = 14;
  const margin = 8;
  const titleFontSize = 20;
  const subtitleFontSize = 15;
  const contentFontSize = 12;
  const pageFont = 'times';

  const titleX = pageWidth * 0.5;
  const titleY = pageMargin;
  const title = 'Inventory Transfer Slip';
  doc.setFont(pageFont, 'bold');
  doc.setFontSize(titleFontSize);
  doc.text(title, titleX, titleY, {
    align: 'center',
  });

  const originInv = fromInvData.value?.getInventory;
  const originX = pageMargin;
  const originY = titleY + margin;
  const origin = `Dari:\n${originInv?.name}\n${originInv?.address}\n${originInv?.city}, ${originInv?.province}`;
  doc.setFont(pageFont, 'normal');
  doc.setFontSize(contentFontSize);
  doc.text(origin, originX, originY);

  const destInv = toInvData.value?.getInventory;
  const destX = pageWidth - pageMargin;
  const destY = titleY + margin;
  const destination = `Kepada:\n${destInv?.name}\n${destInv?.address}\n${destInv?.city}, ${destInv?.province}`;
  doc.setFont(pageFont, 'normal');
  doc.setFontSize(contentFontSize);
  doc.text(destination, destX, destY, { align: 'right' });

  const trfNoLabel = 'No. Transfer: ';
  const trfNoLabelX = pageMargin;
  const trfNoLabelY = destY + margin * 4;
  doc.setFont(pageFont, 'normal');
  doc.setFontSize(contentFontSize);
  doc.text(trfNoLabel, trfNoLabelX, trfNoLabelY);
  const trfNo = selectItemObject.value?.trfNo ?? '';
  const trfNoX = pageMargin + doc.getTextWidth(trfNoLabel) + margin;
  const trfNoY = destY + margin * 4;
  doc.setFont(pageFont, 'bold');
  doc.text(trfNo, trfNoX, trfNoY);

  const trfDateLabel = 'Tanggal Kirim: ';
  const trfDateLabelX = pageMargin;
  const trfDateLabelY = trfNoLabelY + margin;
  doc.setFont(pageFont, 'normal');
  doc.text(trfDateLabel, trfDateLabelX, trfDateLabelY);
  let trfDate = selectItemObject.value?.trfDate ?? '';
  trfDate = adapter.format(trfDate, 'fullDate');
  const trfDateX = pageMargin + doc.getTextWidth(trfNoLabel) + margin;
  const trfDateY = trfNoY + margin;
  doc.setFont(pageFont, 'bold');
  doc.setFontSize(contentFontSize);
  doc.text(trfDate, trfDateX, trfDateY);

  doc.save(`${trfNo}.pdf`);
}

watch(isCreateDialogOpen, (isOpen) => {
  if (isOpen) {
    dialogForm.value = true;
  }
});
watch(dialogForm, (isOpen) => {
  if (!isOpen) {
    executeFetch();
    dialogStore.closeFormDialog();
    selectItemObject.value = null;
  }
});
watch(dialogView, (isOpen) => {
  if (!isOpen) {
    setTimeout(() => {
      selectItemObject.value = null;
    }, 200);
  }
});
watchEffect(() => {
  if (fromInvData.value && toInvData.value && isPrinting.value) {
    exportPdf();
    isPrinting.value = false;
  }
  console.log(`selectItemObject: ${JSON.stringify(selectItemObject.value)}`);
});
</script>
