<template>
  <v-row class="flex-grow-0">
    <v-col>
      <ActionPickDate
        v-model="dates"
        @update:model-value="manageDates"
        multiple="range"
      ></ActionPickDate>
    </v-col>
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
        :items="data?.getWorks"
        :loading="isFetching"
        item-value="id"
        class="flex-grow-1"
        hover
        fixed-header
        :height="`calc(100vh - 262px)`"
        :search="search"
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.date="{ item }">
          {{ adapter.format(item.date, 'fullDateWithWeekday') }}
        </template>
        <template v-slot:item.sizes="{ item }">
          <!-- <v-chip-group direction="vertical">
            <v-chip
              v-for="size in item.sizes"
              variant="outlined"
              disabled
              class="d-flex justify-center"
            >
              {{ `${size.size.eu} | ${size.quantity}` }}
            </v-chip>
          </v-chip-group> -->
          <v-table density="compact">
            <tbody>
              <tr v-for="size in item.sizes" :key="size.size.id">
                <td>{{ size.size.eu }}</td>
                <td>{{ size.quantity }}</td>
              </tr>
            </tbody>
          </v-table>
        </template>

        <template v-slot:item.tasks="{ item }">
          <div class="mb-4">
            <v-timeline align="start" side="end" direction="horizontal">
              <v-timeline-item
                v-for="task in item.tasks"
                size="very small"
                :dot-color="task.doneAt ? 'primary' : 'grey'"
              >
                <div class="d-flex flex-column">
                  <p>
                    {{ $t(renderJob(task.type)) }}
                  </p>
                  <span v-if="task.doneAt" class="mt-2">
                    {{ adapter.format(task.doneAt, 'fullDate') }}
                  </span>
                  <span v-if="task.artisan?.firstName">
                    {{
                      task.artisan.firstName +
                      ' ' +
                      (task.artisan.lastName ?? '')
                    }}
                  </span>
                </div>
              </v-timeline-item>
            </v-timeline>
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <!-- <NuxtLink :to="$localePath(`/works/update/${item.id}`)"> -->
          <v-btn
            color="primary"
            :prepend-icon="mdiPencil"
            variant="text"
            @click="edit(item.id)"
            @mouseenter="register($event)"
          ></v-btn>
          <!-- </NuxtLink> -->
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <v-dialog
    v-model="dialog"
    :activator="activator"
    fullscreen
    transition="dialog-bottom-transition"
  >
    <v-card>
      <v-toolbar>
        <v-btn :icon="mdiClose" @click="closeDialog"></v-btn>
        <v-toolbar-title>{{
          currentWorkId ? $t('page.work_edit') : $t('page.work_create')
        }}</v-toolbar-title>
      </v-toolbar>

      <v-container class="h-100 d-flex flex-column">
        <template v-if="currentWorkId">
          <template v-if="clearanceLevel <= Role.Planner">
            <WorkCreateForm
              :workId="currentWorkId"
              @close-dialog="save"
            ></WorkCreateForm>
          </template>
          <WorkHeader
            v-if="clearanceLevel >= Role.Field"
            class="my-4"
            :workId="currentWorkId"
          ></WorkHeader>
          <v-divider
            class="my-4"
            v-if="clearanceLevel <= Role.Finance"
          ></v-divider>
          <TaskUpdateForm
            v-if="
              clearanceLevel >= Role.Field || clearanceLevel <= Role.Finance
            "
            :workId="currentWorkId"
            @close-dialog="save"
          ></TaskUpdateForm>
        </template>
        <template v-else>
          <WorkCreateForm @close-dialog="save"></WorkCreateForm>
        </template>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<style scoped lang="sass">
.v-chip.v-chip--disabled
  opacity: 1
.v-chip
  max-width: 80px
</style>

<script setup lang="ts">
import { mdiClose, mdiMagnify, mdiPencil } from '@mdi/js';
import dayjs from 'dayjs';
import { useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import { GetWorksDocument } from '~/api/generated/types';
import { CACHE_WORKS } from '~/utils/cache-tags';

type ReadOnlyHeaders = VDataTable['$props']['headers'];

const worksStore = useWorksStore();
const { isFormDialogOpen } = storeToRefs(worksStore);
const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 6;

// Add 34px to height to adjust the footer position
const pageNo = ref(1);
const itemsPerPage = ref(10);

const adapter = useDate();
const now = dayjs();

const findEnd = now.hour(23).minute(59).second(59).millisecond(999);
const findStart = now
  .subtract(2, 'weeks')
  .hour(0)
  .minute(0)
  .second(0)
  .millisecond(0);

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
const search = ref('');
const headers: ReadOnlyHeaders = [
  // { title: t('label.id'), key: 'id' },
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

const currentWorkId = ref('');
const dialog = ref(false);
const activator = ref(undefined);

function openDialog() {
  dialog.value = true;
}

function closeDialog() {
  dialog.value = false;
}

function edit(workId: string) {
  currentWorkId.value = workId;
}
function save() {
  dialog.value = false;
  currentWorkId.value = '';
  execute();
}
function register(event: any) {
  activator.value = event.currentTarget;
}

watch(isFormDialogOpen, (isOpen) => {
  if (isOpen) {
    openDialog();
  }
});
watch(dialog, (isOpen) => {
  if (!isOpen) {
    worksStore.closeFormDialog();
    currentWorkId.value = '';
  }
});

watchEffect(() => {
  console.log(`isFormDialogOpen: ${isFormDialogOpen.value}`);
  console.log(`Form: ${JSON.stringify(form)}`);
});
</script>
