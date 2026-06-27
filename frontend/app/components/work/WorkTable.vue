<template>
  <v-row class="flex-grow-0">
    <v-row v-if="deleteError">
      <v-col>
        <v-alert type="error">
          {{ extractGraphQlError(deleteError) }}
        </v-alert>
      </v-col>
    </v-row>
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

  <v-data-table
    :headers="headers"
    :items="computedWorks"
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
      {{ adapter.format(item.date, 'normalDateWithWeekday') }}
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
          <tr v-for="size in item.workSizes" :key="size.size.id">
            <td>{{ size.size.eu }}</td>
            <td>{{ size.quantity }}</td>
          </tr>
          <tr>
            <td><i>Total</i></td>
            <td>
              <i>
                {{
                  item.workSizes.reduce((sum, size) => sum + size.quantity, 0)
                }}</i
              >
            </td>
          </tr>
        </tbody>
      </v-table>
    </template>

    <template v-slot:item.tasks="{ item }">
      <div class="mb-4">
        <v-timeline align="start" side="end" direction="horizontal">
          <v-timeline-item
            v-for="task in item.tasks"
            size="very-small"
            :dot-color="task.doneAt ? 'surface-variant' : 'grey'"
          >
            <div class="d-flex flex-column">
              <p>
                {{ $t(renderJob(task.type)) }}
              </p>
              <span v-if="task.doneAt" class="mt-2">
                {{ adapter.format(task.doneAt, 'normalDateWithWeekday') }}
              </span>
              <span v-if="task.artisan?.firstName">
                {{
                  task.artisan.firstName + ' ' + (task.artisan.lastName ?? '')
                }}
              </span>
            </div>
          </v-timeline-item>
        </v-timeline>
      </div>
    </template>

    <template v-slot:item.progress="{ item }">
      <v-icon
        :icon="
          item.displayProgress === Progress.Initiated
            ? mdiTimerSandEmpty
            : item.displayProgress === Progress.Completed
              ? mdiTimerSandComplete
              : mdiTimerSand
        "
      ></v-icon>
      <span>{{ $t(`progress.${item.displayProgress}`) }}</span>
    </template>

    <!-- <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            :icon="mdiPencil"
            variant="text"
            @click="edit(item.id)"
          ></v-btn>
        </template> -->

    <template v-slot:item.actions="{ item }">
      <template v-if="clearanceLevel <= Role.Planner">
        <v-menu transition="slide-y-transition" open-on-hover>
          <template v-slot:activator="{ props }">
            <v-btn
              :icon="mdiDotsVertical"
              color="primary"
              v-bind="props"
              variant="text"
            >
            </v-btn>
          </template>
          <v-list>
            <v-list-item
              :prepend-icon="mdiPencil"
              @click="showEditWorkDialog(item.id)"
            >
              <v-list-item-title>{{ $t('page.work_edit') }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              :prepend-icon="mdiPencil"
              @click="showEditTaskDialog(item.id)"
            >
              <v-list-item-title>{{ $t('page.task_edit') }}</v-list-item-title>
            </v-list-item>

            <v-list-item
              :prepend-icon="mdiTrashCan"
              @click="showDeleteDialog(item.id)"
              class="text-error"
            >
              <v-list-item-title>{{ t('btn.delete') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else>
        <v-btn
          color="primary"
          :icon="mdiPencil"
          variant="text"
          @click="showEditTaskDialog(item.id)"
        ></v-btn>
      </template>
    </template>
  </v-data-table>

  <ActionEditItemDialog
    v-model="dialog.isVisible"
    :dialog-title="
      dialog.content === DialogContent.EditWork
        ? $t('page.work_edit')
        : dialog.content === DialogContent.EditTask
          ? $t('page.task_edit')
          : ''
    "
  >
    <WorkCreateForm
      v-if="dialog.content === DialogContent.EditWork"
      :work-id="currentWorkId"
      @close-dialog="save"
    />
    <TaskUpdateForm
      v-if="dialog.content === DialogContent.EditTask"
      :work-id="currentWorkId"
      @close-dialog="save"
    />
  </ActionEditItemDialog>

  <ActionConfirmDeleteDialog
    v-model="confirmDeleteDialog"
    @confirm="if (currentWorkId) executeDelete({ id: currentWorkId });"
    :loading="isDeleting"
  ></ActionConfirmDeleteDialog>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @on-confirm="confirmDeleteDialog = false"
  ></ActionShowSnack>
</template>

<style scoped lang="sass">
.v-chip.v-chip--disabled
  opacity: 1
.v-chip
  max-width: 80px
</style>

<script setup lang="ts">
import {
  mdiDotsVertical,
  mdiMagnify,
  mdiPencil,
  mdiTimerSand,
  mdiTimerSandComplete,
  mdiTimerSandEmpty,
  mdiTrashCan,
} from '@mdi/js';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  DeleteWorkDocument,
  GetWorksDocument,
  Progress,
} from '~/api/generated/types';
import { CACHE_WORKS } from '~/utils/cache-tags';

type ReadOnlyHeaders = VDataTable['$props']['headers'];
enum DialogContent {
  None = 'NONE',
  EditWork = 'EDIT_WORK',
  EditTask = 'EDIT_TASK',
}

const { t } = useI18n();

const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 6;

// Add 34px to height to adjust the footer position
const pageNo = ref(1);
const itemsPerPage = ref(25);

const adapter = useDate();
const now = dayjs();

const storedDates = sessionStorage.getItem('workTableDates');
let findStart, findEnd;

if (storedDates) {
  const parsed = JSON.parse(storedDates);
  findStart = dayjs(parsed.startDate);
  findEnd = dayjs(parsed.endDate);
} else {
  findEnd = now.hour(23).minute(59).second(59).millisecond(999);
  findStart = now
    .subtract(2, 'weeks')
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0);
}

const dates = ref<string[]>([]);

let currentDate = findStart.clone();

while (currentDate.isBefore(findEnd)) {
  dates.value.push(currentDate.format('YYYY-MM-DD'));
  currentDate = currentDate.add(1, 'day');
}
// console.log(`Dates: ${dates.value}`);

const form = reactive({
  startDate: findStart.toISOString(),
  endDate: findEnd.toISOString(),
});

const {
  execute: executeFetch,
  data,
  isFetching,
} = useQuery({
  query: GetWorksDocument,
  tags: [CACHE_WORKS],
  variables: computed(() => ({
    startDate: form.startDate,
    endDate: form.endDate,
  })),
});

const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteWorkDocument, {
  onData(data) {
    snack.message = t('status.deleted');
    snack.isVisible = true;
    executeFetch();
  },
  refetchTags: [CACHE_WORKS],
});

const computedWorks = computed(() => {
  return data.value?.getWorks.map((work) => {
    var displayProgress = Progress.Initiated;

    if (work.progress !== Progress.Initiated) {
      displayProgress = work.progress;
    } else {
      if (work.tasks.every((task) => task.doneAt === null)) {
        displayProgress = Progress.Initiated;
      } else if (work.tasks.every((task) => task.doneAt)) {
        displayProgress = Progress.Completed;
      } else {
        displayProgress = Progress.InProgress;
      }
    }

    return { ...work, displayProgress };
  });
});

const search = ref('');
const headers: ReadOnlyHeaders = [
  // { title: t('label.id'), key: 'id' },
  { title: t('label.date'), key: 'date' },
  { title: t('label.order_no'), key: 'orderNo' },
  { title: t('label.sku'), key: 'product.sku' },
  { title: t('label.sizes'), key: 'sizes', minWidth: '120' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.tasks'), key: 'tasks', minWidth: '300' },
  { title: t('label.note'), key: 'note' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

const confirmDeleteDialog = ref(false);
const snack = reactive({
  isVisible: false,
  message: t('status.deleted'),
  color: SnackColor.Success,
});

function manageDates(newDates: string[] | string) {
  form.startDate = newDates[0] ?? '';
  form.endDate = newDates[newDates.length - 1] ?? '';

  sessionStorage.setItem(
    'workTableDates',
    JSON.stringify({
      startDate: form.startDate,
      endDate: form.endDate,
    }),
  );

  executeFetch();
}

const currentWorkId = ref('');
const dialog = reactive({
  isVisible: false,
  content: DialogContent.None,
});

function openDialog() {
  dialog.isVisible = true;
}

function closeDialog() {
  dialog.isVisible = false;
}

function edit(workId: string) {
  dialog.isVisible = true;
  currentWorkId.value = workId;
}
function save() {
  dialog.isVisible = false;
  currentWorkId.value = '';
  executeFetch();
}
function showEditWorkDialog(workId: string) {
  currentWorkId.value = workId;
  dialog.content = DialogContent.EditWork;
  dialog.isVisible = true;
}
function showEditTaskDialog(workId: string) {
  currentWorkId.value = workId;
  dialog.content = DialogContent.EditTask;
  dialog.isVisible = true;
}

function showDeleteDialog(workId: string) {
  currentWorkId.value = workId;
  confirmDeleteDialog.value = true;
}

watch(
  () => dialog.isVisible,
  (isOpen) => {
    if (!isOpen) {
      currentWorkId.value = '';
    }
  },
);
</script>
