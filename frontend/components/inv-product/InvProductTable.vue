<template>
  <v-row v-if="errorInvProducts || errorInventories" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(errorInvProducts || errorInventories) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row class="flex-grow-0">
    <v-col>
      <v-select
        :label="$t('label.select_inventories')"
        :prepend-inner-icon="mdiWarehouse"
        :items="dataInventories?.getInventories"
        v-model="selectInvId"
        item-title="name"
        item-value="id"
      ></v-select>
    </v-col>
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
        :items="dataInvProducts?.getInvProducts"
        :search="search"
        :loading="isFetchingInvProducts"
        item-value="id"
        class="flex-grow-1"
        fixed-header
        :height="`calc(100vh - 262px)`"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.product.productColors="{ item }">
          <div style="display: flex; flex-wrap: wrap; gap: 8px">
            <template v-for="color in item.product.productColors">
              <v-chip class="d-flex align-center">
                <div
                  class="color-box"
                  :style="{ backgroundColor: color.color.hexCode }"
                />
                <span>{{ color.color.name }}</span>
              </v-chip>
            </template>
          </div>
        </template>

        <template
          v-slot:item.product.productGroup.productCategory.gender="{ item }"
        >
          {{
            $t(renderGender(item.product.productGroup.productCategory.gender))
          }}
        </template>

        <template v-slot:item.invProductSizes="{ item }">
          <v-table density="compact">
            <tbody>
              <tr v-for="size in item.invProductSizes" :key="size.size.id">
                <td>{{ size.size.eu }}</td>
                <td>{{ size.quantity }}</td>
              </tr>
              <tr>
                <td><i>Total</i></td>
                <td>
                  <i>
                    {{
                      item.invProductSizes.reduce(
                        (sum, size) => sum + size.quantity,
                        0,
                      )
                    }}
                  </i>
                </td>
              </tr>
            </tbody>
          </v-table>
        </template>

        <template v-slot:item.invTrfItems="{ item }">
          {{
            item.invTrfItems.filter((i) => i.progress !== Progress.Completed)
              .length
          }}
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
                @click="showItemDetailDialog(item as InvProductDto)"
                :prepend-icon="mdiFileDocumentArrowRightOutline"
              >
                <v-list-item-title>Show Transfer Detail</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="
                  item.invProductSizes.reduce(
                    (sum, item) => sum + item.quantity,
                    0,
                  ) >
                  item.invTrfItems.reduce(
                    (sum, item) =>
                      sum +
                      item.invTrfItemSizes.reduce((s, i) => s + i.quantity, 0),
                    0,
                  )
                "
                @click="showItemFormDialog(item as InvProductDto)"
                :prepend-icon="mdiTransferRight"
              >
                <v-list-item-title> Send To </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog v-model="viewDialog" max-width="1200px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title
          >Transfer Detail for
          {{ itemSelectionObject?.product.sku }}</v-toolbar-title
        >
      </v-toolbar>
      <v-container class="d-flex flex-column">
        <InvProductItemTrfTable
          :inv-product-dto="itemSelectionObject"
          @refresh-table="executeFetch"
        ></InvProductItemTrfTable>
      </v-container>
    </v-card>
  </v-dialog>

  <v-dialog v-model="formDialog" max-width="1200px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>Send Item To </v-toolbar-title>
      </v-toolbar>
      <v-container class="d-flex flex-column">
        <InvProductTrfItemForm
          :inv-product-dto="itemSelectionObject"
          @close-dialog="closeItemFormDialog"
        ></InvProductTrfItemForm>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiFileDocumentArrowRightOutline,
  mdiMagnify,
  mdiTransferRight,
  mdiWarehouse,
} from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  GetInventoriesDocument,
  GetInvProductsDocument,
  Progress,
  type InvProductDto,
} from '~/api/generated/types';
import { CACHE_INV_PRODUCTS } from '~/utils/cache-tags';

const pageNo = ref(1);
const itemsPerPage = ref(25);
// const menuItems = [
//   { title: 'Show Transfer Detail', icon: mdiFileDocumentArrowRightOutline },
//   { title: 'Send To', icon: mdiTransferRight },
// ];

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
      selectInvId.value = firstItem.id;
    }
  },
});

const selectInvId = ref('');
const itemSelectionObject = shallowRef<InvProductDto | null>(null);

const {
  execute: executeFetch,
  data: dataInvProducts,
  isFetching: isFetchingInvProducts,
  error: errorInvProducts,
} = useQuery({
  query: GetInvProductsDocument,
  variables: computed(() => ({ invId: selectInvId.value })),
  tags: [CACHE_INV_PRODUCTS],
});

const { t } = useI18n();

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  // { title: t('label.id'), key: 'id' },
  { title: t('label.sku'), key: 'product.sku' },
  { title: t('label.colors'), key: 'product.productColors', minWidth: '140' },
  {
    title: t('label.product_category'),
    key: 'product.productGroup.productCategory.name',
  },
  {
    title: t('label.gender'),
    key: 'product.productGroup.productCategory.gender',
  },
  { title: t('label.sizes'), key: 'invProductSizes', minWidth: '120' },
  {
    title: 'Incomplete Transfers',
    key: 'invTrfItems',
  },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
const search = ref('');
const viewDialog = ref(false);
const formDialog = ref(false);
const activator = ref(undefined);

// const onMenuItemClick = (index: number, item: InvProductDto) => {
//   switch (index) {
//     case 0:
//       showItemDetailDialog(item);
//       break;
//     case 1:
//       showItemFormDialog(item);
//       break;
//   }
// };

function showItemDetailDialog(item: InvProductDto) {
  viewDialog.value = true;
  itemSelectionObject.value = item;
}
function showItemFormDialog(item: InvProductDto) {
  formDialog.value = true;
  itemSelectionObject.value = item;
}
function closeItemFormDialog() {
  formDialog.value = false;
  itemSelectionObject.value = null;
  executeFetch();
}
</script>
