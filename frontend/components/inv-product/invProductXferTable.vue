<template>
  <v-row v-if="invXfersError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(invXfersError) }}
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
        :items="invXfersData?.getInvXfersPerItem"
        :search="search"
        :loading="isFetchingInvXfers"
        item-value="id"
        class="flex-grow-1"
        fixed-header
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.invProductSizes="{ item }">
          <v-table density="compact">
            <tbody>
              <tr v-for="size in item.invXferItemSizes" :key="size.size.id">
                <td>{{ size.size.eu }}</td>
                <td>{{ size.quantity }}</td>
              </tr>
              <tr>
                <td><i>Total</i></td>
                <td>
                  <i>
                    {{
                      item.invXferItemSizes.reduce(
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
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetInvXfersPerItemDocument } from '~/api/generated/types';

const pageNo = ref(1);
const itemsPerPage = ref(10);
const props = defineProps({
  invId: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
});

const {
  data: invXfersData,
  isFetching: isFetchingInvXfers,
  error: invXfersError,
} = useQuery({
  variables: { invId: props.invId, productId: props.productId },
  query: GetInvXfersPerItemDocument,
  tags: [CACHE_INV_XFERS_PER_ITEM],
});

const { t } = useI18n();

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  { title: t('label.xfer_date'), key: 'invXfer.xferDate' },
  { title: t('label.from_inv'), key: 'invXfer.fromInv.name' },
  { title: t('label.to_inv'), key: 'invXfer.toInv.name' },
  { title: t('label.status'), key: 'invXfer.progress' },
  { title: t('label.sizes'), key: 'invXferItemSizes.', minWidth: '120' },
];
const search = ref('');
</script>
