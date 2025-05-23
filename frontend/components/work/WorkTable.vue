<template>
  <v-row class="flex-grow-0">
    <v-col>
      <ActionPickDate
        v-model="dates"
        @update:model-value="manageDates"
        multiple="range"
      ></ActionPickDate>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="data?.getWorks"
        :loading="isFetching"
        item-value="id"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        class="flex-grow-1"
        hover
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.date="{ item }">
          {{ adapter.format(item.date, 'fullDate') }}
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
                      done_at: adapter.format(task.doneAt, 'fullDate'),
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

<style scoped lang="sass">
.v-chip.v-chip--disabled
  opacity: 1
.v-chip
  max-width: 80px
</style>

<script setup lang="ts">
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiPencil,
} from '@mdi/js';
import dayjs from 'dayjs';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import { GetWorksDocument } from '~/api/generated/types';
import { CACHE_WORKS } from '~/utils/cache-tags';

type ReadOnlyHeaders = VDataTable['$props']['headers'];

const adapter = useDate();
const now = dayjs();

const findEnd = now.hour(23).minute(59).second(59);
const findStart = now.subtract(2, 'weeks').hour(0).second(1);

const dates = ref<string[]>([]);

let currentDate = findStart.clone();
while (currentDate.isBefore(findEnd)) {
  dates.value.push(currentDate.format('YYYY-MM-DD'));
  currentDate = currentDate.add(1, 'day');
}
console.log(`Dates: ${dates.value}`);

const form = reactive({
  startDate: findStart.toISOString(),
  endDate: findEnd.toISOString(),
});

const { execute, data, isFetching } = useQuery({
  query: GetWorksDocument,
  tags: [CACHE_WORKS],
  variables: computed(() => ({
    startDate: form.startDate,
    endDate: form.endDate,
  })),
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

function manageDates(newDates: string[] | string) {
  form.startDate = newDates[0];
  form.endDate = newDates[newDates.length - 1];
  execute();
}

watchEffect(() => {
  console.log(`Form: ${JSON.stringify(form)}`);
});
</script>
