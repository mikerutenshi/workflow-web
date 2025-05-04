<template>
  <div v-if="data" class="wf-fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getArtisans"
      class="elevation-1 flex-grow-1"
      item-value="id"
      :sort-by="[{ key: 'id', order: 'asc' }]"
    >
      <template v-slot:item.jobs="{ item }">
        {{ $t(renderJobs(item.jobs)) }}
      </template>
      <template v-slot:item.actions="{ item, index }">
        <NuxtLink :to="`/artisans/update/${item.id}`">
          <v-btn color="primary" :icon="mdiPencil" variant="text"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table>
  </div>
  <div v-else>Loading...</div>
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetArtisansDocument } from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data } = useQuery({
  query: GetArtisansDocument,
  tags: [CACHE_ARTISANS],
});

const headers: ReadOnlyHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Jobs', key: 'jobs' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
</script>
