<template>
  <template v-if="isComingSoon">
    <ComingSoon></ComingSoon>
  </template>
  <template v-else>
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
          :items="invProductsDisplay"
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

          <template v-slot:item.price="{ item }">
            {{ formatRupiah(item.price) }}
          </template>

          <template #item.discount="{ item }">{{
            item.discount
              ? formatDiscount(convertDecimalToPercent(item.discount))
              : null
          }}</template>

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
            <div v-if="item.pendingCount > 0">
              {{ item.pendingCount }}
              <v-icon :icon="mdiProgressAlert"></v-icon>
            </div>
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
                  @click="
                    () => {
                      const { pendingCount, ...rest } = item;
                      showItemTrfDialog(rest as InvProductDto);
                    }
                  "
                  :prepend-icon="mdiFileDocumentArrowRightOutline"
                >
                  <v-list-item-title>{{
                    $t('label.show_trf_detail')
                  }}</v-list-item-title>
                </v-list-item>

                <v-list-item
                  @click="
                    () => {
                      const { pendingCount, ...rest } = item;
                      showItemTxDialog(rest as InvProductDto);
                    }
                  "
                  :prepend-icon="mdiFileDocumentArrowRightOutline"
                >
                  <v-list-item-title>{{
                    $t('label.show_tx_detail')
                  }}</v-list-item-title>
                </v-list-item>

                <v-list-item
                  v-if="
                    item.invProductSizes.reduce(
                      (sum, item) => sum + item.quantity,
                      0,
                    ) > 0
                  "
                  @click="
                    () => {
                      const { pendingCount, ...rest } = item;
                      showItemFormDialog(rest as InvProductDto);
                    }
                  "
                  :prepend-icon="mdiTransferRight"
                >
                  <v-list-item-title>{{
                    $t('label.send_to')
                  }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <ActionEditItemDialog
      :dialogTitle="dialog.title"
      v-model="dialog.isVisible"
    >
      <template v-if="dialog.content === DialogContent.TrfDetail">
        <InvProductItemTrfTable
          :inv-product-dto="itemSelectionObject"
          @refresh-table="executeFetch"
        ></InvProductItemTrfTable>
      </template>
      <template v-if="dialog.content === DialogContent.TxDetail">
        <InvTxTable
          :inv-product-dto="itemSelectionObject"
          @refresh-table="executeFetch"
        ></InvTxTable>
      </template>
      <template v-else-if="dialog.content === DialogContent.Form">
        <InvTrfItemForm
          :inv-product-dto="itemSelectionObject"
          @close-dialog="closeItemFormDialog"
        ></InvTrfItemForm>
      </template>
    </ActionEditItemDialog>

    <!-- <v-dialog v-model="dialog.isVisible" max-width="1200px">
      <v-card>
        <v-toolbar>
          <v-toolbar-title>{{
            dialog.content === DialogContent.ItemDetail
              ? $t('page.trf_detail_for', {
                  item: itemSelectionObject?.product.sku || 'Item',
                })
              : dialog.content === DialogContent.Form
                ? $t('page.send_to', {
                    product: itemSelectionObject?.product.sku,
                  })
                : ''
          }}</v-toolbar-title>
        </v-toolbar>

        <v-container class="d-flex flex-column">
          <template v-if="dialog.content === DialogContent.ItemDetail">
            <InvProductItemTrfTable
              :inv-product-dto="itemSelectionObject"
              @refresh-table="executeFetch"
            ></InvProductItemTrfTable>
          </template>
          <template v-else-if="dialog.content === DialogContent.Form">
            <InvProductTrfItemForm
              :inv-product-dto="itemSelectionObject"
              @close-dialog="closeItemFormDialog"
            ></InvProductTrfItemForm>
          </template>
        </v-container>
      </v-card>
    </v-dialog> -->
  </template>
</template>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiFileDocumentArrowRightOutline,
  mdiMagnify,
  mdiProgressAlert,
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
import { Role } from '~/utils/constants';

enum DialogContent {
  None = 'NONE',
  TrfDetail = 'TRF_DETAIL',
  TxDetail = 'TX_DETAIL',
  Form = 'FORM',
}
const authStore = useAuthStore();
const clearance = authStore.user?.role.clearanceLevel ?? 6;
const isComingSoon = computed(() => {
  return clearance > Role.Superuser;
});

const pageNo = ref(1);
const itemsPerPage = ref(25);

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
const invProductsDisplay = computed(() => {
  return dataInvProducts.value?.getInvProducts.map((product) => {
    const pendingCount = product.invTrfItems.filter(
      (i) => i.progress === Progress.Pending,
    ).length;

    return {
      ...product,
      pendingCount,
    };
  });
});

const {
  execute: executeFetch,
  data: dataInvProducts,
  isFetching: isFetchingInvProducts,
  error: errorInvProducts,
} = useQuery({
  query: GetInvProductsDocument,
  variables: computed(() => ({ invId: selectInvId.value })),
  tags: [CACHE_INV_PRODUCTS],
  fetchOnMount: false,
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
  { title: t('label.price'), key: 'price' },
  { title: t('label.discount'), key: 'discount' },
  { title: t('label.sizes'), key: 'invProductSizes', minWidth: '120' },
  {
    title: t('label.pending_trfs'),
    key: 'invTrfItems',
  },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
const search = ref('');
const dialog = reactive({
  isVisible: false,
  content: DialogContent.None,
  title: '',
});

function showItemTrfDialog(item: InvProductDto) {
  dialog.isVisible = true;
  dialog.content = DialogContent.TrfDetail;
  itemSelectionObject.value = item;
  dialog.title = t('page.trf_detail_for', {
    item: itemSelectionObject.value.product.sku || 'Item',
  });
}
function showItemTxDialog(item: InvProductDto) {
  dialog.isVisible = true;
  dialog.content = DialogContent.TxDetail;
  itemSelectionObject.value = item;
  dialog.title = t('page.tx_detail_for', {
    item: itemSelectionObject.value.product.sku || 'Item',
  });
}
function showItemFormDialog(item: InvProductDto) {
  dialog.isVisible = true;
  dialog.content = DialogContent.Form;
  itemSelectionObject.value = item;
  dialog.title = t('page.send_to', {
    product: itemSelectionObject.value.product.sku,
  });
}
function closeItemFormDialog() {
  dialog.isVisible = false;
  dialog.content = DialogContent.None;
  itemSelectionObject.value = null;
  executeFetch();
}

watchEffect(() => {
  if (selectInvId && selectInvId.value !== '') {
    executeFetch();
  }
});
</script>
