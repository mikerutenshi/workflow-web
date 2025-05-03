<template>
  <div v-if="data" class="wf-fill-screen">
    <v-data-table
      :headers="headers"
      :items="data.getWorks"
      item-value="id"
      :sort-by="[{ key: 'id', order: 'asc' }]"
      class="flex-grow-1"
    >
      <template v-slot:item.date="{ item }">
        {{ formatLocalDate(item.date) }}
      </template>
      <template v-slot:item.sizes="{ item }">
        <v-chip-group direction="vertical">
          <v-chip
            v-for="size in item.sizes"
            variant="outlined"
            disabled
            class="d-flex justify-center"
          >
            {{ `${size.size.eu} | ${size.quantity}` }}
          </v-chip>
        </v-chip-group>
      </template>

      <template v-slot:item.tasks="{ item }">
        <v-list density="compact">
          <v-list-item v-for="task in item.tasks" :title="renderJob(task.type)">
            {{
              task.artisan
                ? `By: ${task.artisan?.firstName} ${
                    task.artisan?.lastName ?? ''
                  } At: ${formatLocalDate(task.doneAt)}`
                : ''
            }}
            <template v-slot:prepend>
              <v-icon
                v-if="task.artisan"
                :icon="mdiCheckboxMarkedOutline"
              ></v-icon>
              <v-icon v-else :icon="mdiCheckboxBlankOutline"></v-icon>
            </template>
          </v-list-item>
        </v-list>
      </template>

      <template v-slot:item.actions="{ item }">
        <NuxtLink :to="`/works/update/${item.id}`">
          <v-btn color="primary" :icon="mdiPencil" variant="text"></v-btn>
        </NuxtLink>
      </template>
    </v-data-table>
  </div>
  <div v-else>Loading...</div>
</template>

<style scoped lang="sass">
.v-chip.v-chip--disabled
  opacity: 1
</style>

<script setup lang="ts">
import {
  mdiCheckboxBlank,
  mdiCheckboxBlankOutline,
  mdiCheckboxMarked,
  mdiCheckboxMarkedCircleOutline,
  mdiCheckboxMarkedOutline,
  mdiPencil,
} from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetWorksDocument } from '~/api/generated/types';
import { CACHE_WORKS } from '~/utils/cache-tags';

type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { data } = useQuery({
  query: GetWorksDocument,
  tags: [CACHE_WORKS],
});

const headers: ReadOnlyHeaders = [
  { title: 'ID', key: 'id' },
  { title: 'Date', key: 'date' },
  { title: 'SPK', key: 'orderNo' },
  { title: 'SKU', key: 'product.sku' },
  { title: 'Size | Quantity', key: 'sizes' },
  { title: 'Tasks', key: 'tasks' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

function formatLocalDate(utcDate: string) {
  return utcDate ? new Date(utcDate).toLocaleDateString() : '-';
}
</script>
