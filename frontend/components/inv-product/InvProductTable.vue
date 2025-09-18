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
        no-filter
        :label="$t('label.select_inventories')"
        :prepend-inner-icon="mdiWarehouse"
        :items="dataInventories?.getInventories"
        item-title="name"
        multiple
        auto-select-first
        chips
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
        :height="`calc(100vh - 240px)`"
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

        <template v-slot:item.actions="{ item }">
          <NuxtLink :to="$localePath(`/products/update/${item.id}`)">
            <v-btn
              color="primary"
              :prepend-icon="mdiPencil"
              variant="text"
            ></v-btn>
          </NuxtLink>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<style scoped>
.color-box {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-right: 8px;
}
</style>

<script setup lang="ts">
import { mdiClose, mdiMagnify, mdiPencil, mdiWarehouse } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import {
  GetInventoriesDocument,
  GetInvProductsDocument,
} from '~/api/generated/types';
import { CACHE_INV_PRODUCTS } from '~/utils/cache-tags';

const pageNo = ref(1);
const itemsPerPage = ref(25);

const {
  execute,
  data: dataInvProducts,
  isFetching: isFetchingInvProducts,
  error: errorInvProducts,
} = useQuery({
  query: GetInvProductsDocument,
  tags: [CACHE_INV_PRODUCTS],
});
const {
  data: dataInventories,
  isFetching: isFetchingInventories,
  error: errorInventories,
} = useQuery({
  query: GetInventoriesDocument,
  tags: [CACHE_INVENTORIES],
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
</script>
