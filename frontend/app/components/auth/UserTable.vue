<template>
  <v-data-table
    :headers="headers"
    fixed-header
    hover
    :items="data?.getUsers"
    item-key="id"
    :search="search"
    :height="`calc(100vh - 215px)`"
  >
    <template v-slot:item.createdAt="{ item }: { item: any }">
      {{ formatToLocalDate(item.createdAt) }}
    </template>

    <template #top>
      <v-text-field
        v-model="search"
        :label="$t('label.search')"
        :prepend-inner-icon="mdiMagnify"
        single-line
        hide-details
        density="compact"
        class="mx-4 my-2"
      ></v-text-field>
    </template>
  </v-data-table>
</template>

<script setup lang="ts">
import { mdiMagnify } from '@mdi/js';
import { useQuery } from 'villus';
import { ref } from 'vue';
import { GetUsersDocument } from '~/api/generated/types';

const { data } = useQuery({
  query: GetUsersDocument,
});

const search = ref('');

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role.name' },
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Created At', key: 'createdAt' },
]);

function formatToLocalDate(isoString: string) {
  const date = new Date(isoString); // Parse ISO string into a Date object
  return new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 12-hour format
  }).format(date);
}
</script>
