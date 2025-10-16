<template>
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

        <template v-slot:item.invTrfItems="{ item }">
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
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import { GetInvTrfsDocument } from '~/api/generated/types';

const pageNo = ref(1);
const itemsPerPage = ref(10);

const {
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
  { title: t('label.from_inv'), key: 'fromInv.name' },
  { title: t('label.to_inv'), key: 'toInv.name' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.quantity'), key: 'invTrfItems' },
];
const search = ref('');
</script>
