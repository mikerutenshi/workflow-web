<template>
  <!-- <v-row v-if="invTrfsError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(invTrfsError) }}
      </v-alert>
    </v-col>
  </v-row> -->

  <!-- <v-row class="flex-grow-0">
    <v-col>
      <v-text-field
        v-model="search"
        :label="$t('label.search')"
        :prepend-inner-icon="mdiMagnify"
        hide-details
        single-line
      ></v-text-field>
    </v-col>
  </v-row> -->

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="props.invTrfDto?.invTrfItems"
        :search="search"
        item-value="invTrfId"
        hover
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>
        <!-- 
        <template v-slot:item.invTrf.trfDate="{ item }">
          {{ adapter.format(item.invTrf.trfDate, 'fullDateTime12h') }}
        </template> -->

        <template v-slot:item.invTrfItemSizes="{ item }">
          <v-table density="compact">
            <tbody>
              <tr v-for="i in item.invTrfItemSizes" :key="i.size.id">
                <td>{{ i.size.eu }}</td>
                <td>{{ i.quantity }}</td>
              </tr>
              <tr>
                <td><i>Total</i></td>
                <td>
                  <i>
                    {{
                      item.invTrfItemSizes.reduce(
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
import { useQuery } from 'villus';
import type { PropType } from 'vue';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import { type InvTrfDto } from '~/api/generated/types';

const pageNo = ref(1);
const itemsPerPage = ref(10);
const props = defineProps({
  invTrfDto: {
    type: Object as PropType<InvTrfDto | null>,
    required: false,
  },
});

// const {
//   data: invTrfsData,
//   isFetching: isFetchingInvTrfs,
//   error: invTrfsError,
// } = useQuery({
//   variables: { invId: props.invId, productId: props.productId },
//   query: GetInvTrfsPerItemDocument,
//   tags: [CACHE_INV_TRFS_PER_ITEM],
// });

const { t } = useI18n();
const adapter = useDate();

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  { title: t('label.sku'), key: 'product.sku' },
  // { title: t('label.trf_no'), key: 'invTrf.trfNo' },
  // { title: t('label.from_inv'), key: 'invTrf.fromInv.name' },
  // { title: t('label.to_inv'), key: 'invTrf.toInv.name' },
  // { title: t('label.status'), key: 'invTrf.progress' },
  { title: t('label.sizes'), key: 'invTrfItemSizes', minWidth: '120' },
];
const search = ref('');
</script>
