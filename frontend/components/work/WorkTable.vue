<template>
  <v-row class="flex-grow-0">
    <v-col>
      <v-date-input
        :label="$t('label.date')"
        variant="outlined"
        multiple="range"
        class="ma-4"
        v-model="datePicker"
        show-adjacent-months
      ></v-date-input>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-skeleton-loader v-if="isFetching" type="table"></v-skeleton-loader>
      <v-data-table
        v-else
        :headers="headers"
        :items="data.getWorks"
        item-value="id"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        class="flex-grow-1"
      >
        <!-- <template v-slot:loading>
          <v-skeleton-loader type="table-tbody"></v-skeleton-loader>
        </template> -->

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
            <v-list-item
              v-for="task in item.tasks"
              :title="$t(renderJob(task.type))"
            >
              {{
                task.artisan
                  ? `${$t('label.by', {
                      artisan:
                        task.artisan?.firstName +
                        (task.artisan?.lastName
                          ? ' ' + task.artisan.lastName
                          : ''),
                    })}${$t('label.at', {
                      done_at: formatLocalDate(task.doneAt),
                    })}`
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
          <NuxtLink :to="$localePath(`/works/update/${item.id}`)">
            <v-btn color="primary" :prepend-icon="mdiPencil" variant="text">{{
              $t('btn.update')
            }}</v-btn>
          </NuxtLink>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<style scoped lang="sass">
.v-chip.v-chip--disabled
  opacity: 1
</style>

<script setup lang="ts">
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiPencil,
} from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetWorksDocument, type WorkWithTasks } from '~/api/generated/types';
import { CACHE_WORKS } from '~/utils/cache-tags';

type ReadOnlyHeaders = VDataTable['$props']['headers'];

const today = new Date();

const form = reactive({
  startDate: new Date(new Date(today).setDate(today.getDate() - 30)),
  endDate: new Date(today),
});
const datePicker = ref([
  ...Array.from(
    {
      length:
        (form.endDate.getTime() - form.startDate.getTime()) /
          (1000 * 60 * 60 * 24) +
        1,
    },
    (_, i) => new Date(form.startDate.getTime() + i * (1000 * 60 * 60 * 24))
  ),
]);

const { execute, data, isFetching } = useQuery({
  query: GetWorksDocument,
  tags: [CACHE_WORKS],
  variables: computed(() => ({
    startDate: form.startDate,
    endDate: form.endDate,
  })),
  paused: true,
});

const { t } = useI18n();
const headers: ReadOnlyHeaders = [
  { title: t('label.id'), key: 'id' },
  { title: t('label.date'), key: 'date' },
  { title: t('label.order_no'), key: 'orderNo' },
  { title: t('label.sku'), key: 'product.sku' },
  { title: t('label.sizes'), key: 'sizes', minWidth: '120' },
  { title: t('label.tasks'), key: 'tasks', minWidth: '300' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

watch(
  datePicker,
  (newDates: Date[]) => {
    form.startDate = new Date(
      newDates
        .reduce((min, date) => (date < min ? date : min))
        .setHours(0, 0, 0, 0)
    );

    form.endDate = new Date(
      newDates
        .reduce((max, date) => (date > max ? date : max), newDates[0])
        .setHours(23, 59, 59, 999)
    );
    execute();
  },
  { immediate: true }
);

watchEffect(() => {
  console.log(`Form: ${JSON.stringify(form)}`);
  console.log(`Dates: ${JSON.stringify(datePicker.value)}`);
});
</script>
