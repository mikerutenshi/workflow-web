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
      <v-skeleton-loader v-if="isFetching" type="table"></v-skeleton-loader>
      <v-data-table
        v-else
        :headers="headers"
        :items="data?.getWorks"
        item-value="id"
        :sort-by="[{ key: 'id', order: 'asc' }]"
        class="flex-grow-1"
      >
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
import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import { GetWorksDocument } from '~/api/generated/types';
import { CACHE_WORKS } from '~/utils/cache-tags';

type ReadOnlyHeaders = VDataTable['$props']['headers'];

const adapter = useDate();
const now = dayjs();
dayjs.extend(weekday);

const nextThurs =
  now.day() < 5
    ? now.weekday(4).hour(23).minute(59).second(59)
    : now.add(1, 'week').weekday(4).hour(23).minute(59).second(59);
console.log(`Next Thurs: ${nextThurs}`);

const lastFrid = nextThurs.subtract(6, 'days').hour(0).second(1);
console.log(`Last Frid: ${lastFrid}`);

const dates = ref<string[]>([]);

let currentDate = lastFrid.clone();
while (currentDate.isBefore(nextThurs)) {
  dates.value.push(currentDate.format('YYYY-MM-DD'));
  currentDate = currentDate.add(1, 'day');
}
console.log(`Dates: ${dates.value}`);

const form = reactive({
  startDate: lastFrid.toISOString(),
  endDate: nextThurs.toISOString(),
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
