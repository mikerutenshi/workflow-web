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

        <!-- <template v-slot:item.actions="{ item }">
          <v-menu transition="slide-y-transition" open-on-hover>
            <template v-slot:activator="{ props }">
              <v-btn
                :prepend-icon="mdiDotsVertical"
                color="primary"
                v-bind="props"
                variant="text"
              >
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(menuItem, index) in menuItems"
                :key="index"
                :value="index"
                @click="
                  index === 0 ? showItemDialog(item as InvProductDto) : null
                "
              >
                <v-list-item-title>{{ menuItem.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </template> -->

        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            :icon="mdiFileDocumentArrowRightOutline"
            variant="text"
            @click="showItemDialog(item as InvProductDto)"
          ></v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog v-model="dialog" max-width="1200px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title
          >Transfer Details for {{ selectItem.productSku }}</v-toolbar-title
        >
      </v-toolbar>
      <v-container class="d-flex flex-column">
        <InvProductItemTrfTable
          :inv-id="selectInvId"
          :product-id="selectItem.productId"
        ></InvProductItemTrfTable>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {
  mdiClose,
  mdiDotsVertical,
  mdiEye,
  mdiFileDocumentArrowRight,
  mdiFileDocumentArrowRightOutline,
  mdiFileDocumentEdit,
  mdiMagnify,
  mdiPencil,
  mdiWarehouse,
} from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  GetInventoriesDocument,
  GetInvProductsDocument,
  type InvProductDto,
} from '~/api/generated/types';
import { CACHE_INV_PRODUCTS } from '~/utils/cache-tags';

const pageNo = ref(1);
const itemsPerPage = ref(25);
const menuItems = [{ title: 'Show Details' }, { title: 'Edit' }];

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
const selectItem = reactive({
  productId: '',
  productSku: '',
});

const {
  execute,
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
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
const search = ref('');
const dialog = ref(false);
const activator = ref(undefined);

function showItemDialog(item: InvProductDto) {
  dialog.value = true;
  selectItem.productId = item.productId;
  selectItem.productSku = item.product.sku;
}
</script>
