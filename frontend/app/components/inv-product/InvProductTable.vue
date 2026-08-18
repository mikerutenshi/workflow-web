<template>
  <v-row v-if="errorInvProducts" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(errorInvProducts) }}
      </v-alert>
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
        fixed-header
        :height="`calc(100vh - 235px)`"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #top>
          <v-row class="mx-4 my-2">
            <v-col cols="5">
              <v-select
                :label="$t('label.select_inventories')"
                :prepend-inner-icon="mdiWarehouse"
                :items="authStore.user?.userInventories"
                v-model="selectInvId"
                item-title="name"
                item-value="id"
                hide-details
                density="compact"
              ></v-select>
            </v-col>
            <v-col cols="5">
              <v-text-field
                v-model="search"
                :label="$t('label.search')"
                :prepend-inner-icon="mdiMagnify"
                hide-details
                single-line
                density="compact"
              ></v-text-field>
            </v-col>
            <v-col class="d-flex justify-center" cols="2">
              <h3>{{ `Total: ${$t('label.pairs', totalQty)}` }}</h3>
            </v-col>
          </v-row>
        </template>
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

        <template #item.discounts="{ item }">{{
          item.discounts
            ? item.discounts
                .map((disc) => formatDiscount(convertDecimalToPercent(disc)))
                .join(' + ')
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
            <v-icon :icon="mdiProgressAlert"></v-icon>
            {{ `${$t('label.transfers', item.pendingCount)}` }}
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
                <v-list-item-title>{{ $t('label.send_to') }}</v-list-item-title>
              </v-list-item>
              <v-list-item
                v-if="clearanceLevel <= Role.Planner"
                :title="$t('btn.inv_product_edit_disc')"
                :prepend-icon="mdiPercent"
                @click="
                  () => {
                    const { pendingCount, ...rest } = item;
                    showUpdateDiscDialog(rest as InvProductDto);
                  }
                "
              >
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog :dialogTitle="dialog.title" v-model="dialog.isVisible">
    <template v-if="dialog.content === DialogContent.TrfDetail">
      <InvProductItemTrfTable
        :inv-product-dto="itemSelectionObject"
      ></InvProductItemTrfTable>
    </template>
    <template v-else-if="dialog.content === DialogContent.TxDetail">
      <InvTxTable :inv-product-dto="itemSelectionObject"></InvTxTable>
    </template>
    <template v-else-if="dialog.content === DialogContent.Form">
      <InvTrfItemForm
        :inv-product-dto="itemSelectionObject"
        @form-submit="closeItemFormDialog"
      ></InvTrfItemForm>
    </template>
    <template v-else-if="dialog.content === DialogContent.FormDisc">
      <InvProductUpdateDiscForm
        :inv-product-dto="itemSelectionObject"
        @form-submit="closeItemFormDialog"
      ></InvProductUpdateDiscForm>
    </template>
    <template v-else-if="dialog.content === DialogContent.Download">
      <InvProductDownloadForm />
    </template>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiFileDocumentArrowRightOutline,
  mdiMagnify,
  mdiPercent,
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

const { registerDownload, unregisterDownload } = useDownloadProducts();
onMounted(() => registerDownload(openDownloadDialog));
onUnmounted(() => unregisterDownload());

enum DialogContent {
  None = 'NONE',
  TrfDetail = 'TRF_DETAIL',
  TxDetail = 'TX_DETAIL',
  Form = 'FORM',
  FormDisc = 'FORM_DISC',
  Download = 'DOWNLOAD',
}

const pageNo = ref(1);
const itemsPerPage = ref(25);

const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 99;
const selectInvId = ref(authStore.user?.userInventories.at(0)?.id ?? '');
const itemSelectionObject = shallowRef<InvProductDto | null>(null);
const invProductsDisplay = computed(() => {
  console.log(`data: ${JSON.stringify(dataInvProducts.value?.getInvProducts)}`);
  return dataInvProducts.value?.getInvProducts.map((product) => {
    const pendingCount = product.invTrfItems.filter(
      (i) => i.progress !== Progress.Completed,
    ).length;

    return {
      ...product,
      pendingCount,
    };
  });
});
const totalQty = computed(() => {
  const data = dataInvProducts.value?.getInvProducts;
  const total = data?.reduce((sum, item) => {
    const sizesTotal = item.invProductSizes.reduce(
      (s, i) => s + (i.quantity ?? 0),
      0,
    );
    return sum + sizesTotal;
  }, 0);

  return total ?? 0;
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
  { title: t('label.sizes'), key: 'invProductSizes' },
  { title: t('label.price'), key: 'price' },
  { title: t('label.discount'), key: 'discounts' },
  { title: t('label.colors'), key: 'product.productColors' },
  {
    title: t('label.product_category'),
    key: 'product.productGroup.productCategory.name',
  },
  {
    title: t('label.gender'),
    key: 'product.productGroup.productCategory.gender',
  },
  {
    title: t('label.pending_trfs'),
    key: 'invTrfItems',
    maxWidth: '80',
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
}
function showUpdateDiscDialog(item: InvProductDto) {
  dialog.isVisible = true;
  dialog.content = DialogContent.FormDisc;
  itemSelectionObject.value = item;
  dialog.title = t('page.inv_product_edit_disc', {
    item: itemSelectionObject.value.product.sku,
  });
}
function openDownloadDialog() {
  dialog.isVisible = true;
  dialog.content = DialogContent.Download;
  dialog.title = "Download Inventory's Products";
}

watchEffect(() => {
  if (selectInvId && selectInvId.value !== '') {
    executeFetch();
  }
});
</script>
