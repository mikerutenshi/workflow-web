<template>
  <v-data-table
    :headers="headers"
    :items="data?.getArtisans"
    :loading="isFetching"
    class="flex-grow-1"
    item-value="id"
    :sort-by="[{ key: 'id', order: 'asc' }]"
    hover
  >
    <template #loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <template v-slot:item.jobs="{ item }">
      {{ item.jobs.map((job) => $t(renderJob(job))).join(', ') }}
    </template>
    <template v-slot:item.actions="{ item }">
      <NuxtLink :to="$localePath(`/artisans/update/${item.id}`)">
        <v-btn color="primary" :prepend-icon="mdiPencil" variant="text">{{
          $t('btn.update')
        }}</v-btn>
      </NuxtLink>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetArtisansDocument } from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data, isFetching } = useQuery({
  query: GetArtisansDocument,
  tags: [CACHE_ARTISANS],
});

const { t } = useI18n();
const headers: ReadOnlyHeaders = [
  { title: t('label.id'), key: 'id' },
  { title: t('label.first_name'), key: 'firstName' },
  { title: t('label.last_name'), key: 'lastName' },
  { title: t('label.jobs'), key: 'jobs' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
</script>
