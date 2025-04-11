<template>
  <div v-if="data" class="fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getArtisans"
      class="elevation-1 flex-grow-1"
      item-value="id"
      :sort-by="[{ key: 'id', order: 'asc' }]"
    >
      <template v-slot:item.jobs="{ item }">
        {{ renderJobs(item.jobs) }}
      </template>
      <template v-slot:item.actions="{ item, index }">
        <NuxtLink :to="`/artisans/update/${item.id}`">
          <v-btn color="primary" icon="mdi-pencil" variant="text"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped>
.fill-screen {
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  overflow: auto;
}
.full-height {
  flex-grow: 1; /* Expand to fill available space */
}
</style>

<script setup lang="ts">
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
function renderJobs(jobs: string[]) {
  let stringResult = '';
  const jobTitles = jobs.map((jobId) => {
    const job = JOB_OPTIONS.find((item) => item.id === jobId);
    return job?.title;
  });
  jobTitles.forEach((title) => {
    stringResult += `${title}, `;
  });

  return stringResult.slice(0, -2);
}
</script>
