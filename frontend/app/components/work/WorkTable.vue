<template>
  <v-data-table
    :headers="headers"
    :items="computedWorks"
    :loading="isFetching"
    item-value="id"
    hover
    fixed-header
    :height="`calc(100vh - 215px)`"
    :search="search"
    :page="pageNo"
    :items-per-page="itemsPerPage"
  >
    <template #top>
      <v-row class="mx-4 my-2">
        <v-col>
          <ActionPickDate
            v-model="dates"
            @update:model-value="manageDates"
            multiple="range"
            :hide-details="true"
            density="compact"
          ></ActionPickDate>
        </v-col>
        <v-col>
          <v-text-field
            v-model="search"
            :label="$t('label.search')"
            :prepend-inner-icon="mdiMagnify"
            hide-details
            single-line
            density="compact"
          ></v-text-field>
        </v-col>
      </v-row>
    </template>
    <template #loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <template v-slot:item.date="{ item }">
      {{ adapter.format(item.date, 'normalDateWithWeekday') }}
    </template>
    <template v-slot:item.sizes="{ item }">
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

    <template v-slot:item.invTrf="{ item }">
      <template v-if="item.invTrf">
        <span>{{
          `${$t('btn.yes')}, ${t('label.trf_no')}: ${item.invTrf?.trfNo}`
        }}</span>
      </template>
      <template v-else>
        <span>{{ `${$t('btn.no')}` }}</span>
      </template>
    </template>

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
              v-if="!item.invTrf"
              :prepend-icon="mdiPencil"
              @click="showEditWorkDialog(item)"
            >
              <v-list-item-title>{{ $t('page.work_edit') }}</v-list-item-title>
            </v-list-item>
            <v-list-item
              :prepend-icon="mdiPencil"
              @click="showEditTaskDialog(item)"
            >
              <v-list-item-title>{{ $t('page.task_edit') }}</v-list-item-title>
            </v-list-item>

            <v-list-item
              v-if="!item.invTrf"
              :prepend-icon="mdiTransferRight"
              @click="showTransferDialog(item)"
            >
              <v-list-item-title>{{
                t('btn.add_to_inventory')
              }}</v-list-item-title>
            </v-list-item>

            <v-divider></v-divider>

            <v-list-item
              v-if="!item.invTrf"
              :prepend-icon="mdiTrashCan"
              @click="showDeleteDialog(item)"
              class="text-error"
            >
              <v-list-item-title>{{ t('btn.delete') }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
      <template v-else-if="clearanceLevel > Role.Planner && !item.invTrf">
        <v-btn
          color="primary"
          :icon="mdiPencil"
          variant="text"
          @click="showEditTaskDialog(item)"
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
      :work-id="selectedObject?.id"
      @form-submit="cleanup"
    />
    <TaskUpdateForm
      v-if="dialog.content === DialogContent.EditTask"
      :work-id="selectedObject?.id"
      @form-submit="cleanup"
    />
  </ActionEditItemDialog>

  <ActionConfirmActionDialog
    v-model="confirmActionDialog"
    @confirm="performExecute(confirmAction)"
    :loading="isDeleting || isTransfering"
    :action-type="confirmAction"
  ></ActionConfirmActionDialog>
</template>

<style scoped lang="sass">
.v-chip.v-chip--disabled
  opacity: 1
.v-chip
  max-width: 80px
</style>

<script setup lang="ts">
import {
  mdiCheck,
  mdiDotsVertical,
  mdiMagnify,
  mdiPencil,
  mdiTimerSand,
  mdiTimerSandComplete,
  mdiTimerSandEmpty,
  mdiTransferRight,
  mdiTrashCan,
} from '@mdi/js';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  AddToInventoryDocument,
  DeleteWorkDocument,
  GetWorksDocument,
  Progress,
  type AddToInventoryDto,
  type GetWorksQuery,
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
const snack = useSnackbarStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 99;
const userId = authStore.user?.id || '';

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
  execute: executeTransfer,
  isFetching: isTransfering,
  error: errorTransfer,
} = useMutation(AddToInventoryDocument, {
  onData(data) {
    snack.show(t('status.saved'), SnackColor.Success);
  },
  onError(err) {
    snack.show(extractGraphQlError(err), SnackColor.Error);
  },
  refetchTags: [CACHE_WORKS],
});

const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteWorkDocument, {
  onData(data) {
    snack.show(t('status.deleted'), SnackColor.Success);
  },
  onError(err) {
    snack.show(extractGraphQlError(err), SnackColor.Error);
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
  { title: t('label.sizes'), key: 'sizes' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.tasks'), key: 'tasks' },
  { title: t('label.note'), key: 'note', maxWidth: '120' },
  { title: t('label.is_in_inventory'), key: 'invTrf', maxWidth: '120' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

const confirmActionDialog = ref(false);
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

const dialog = reactive({
  isVisible: false,
  content: DialogContent.None,
});

type WorkData = GetWorksQuery['getWorks'][number];
const selectedObject = ref<WorkData | null>(null);
enum ActionType {
  DELETE = 'DELETE',
  TRANSFER = 'TRANSFER',
}
const confirmAction = ref(ActionType.DELETE);

function cleanup() {
  dialog.isVisible = false;
  selectedObject.value = null;
}
function showEditWorkDialog(selection: WorkData) {
  selectedObject.value = selection;
  dialog.content = DialogContent.EditWork;
  dialog.isVisible = true;
}
function showEditTaskDialog(selection: WorkData) {
  selectedObject.value = selection;
  dialog.content = DialogContent.EditTask;
  dialog.isVisible = true;
}

function showDeleteDialog(selection: WorkData) {
  selectedObject.value = selection;
  confirmActionDialog.value = true;
  confirmAction.value = ActionType.DELETE;
}

function showTransferDialog(selection: WorkData) {
  selectedObject.value = selection;
  confirmActionDialog.value = true;
  confirmAction.value = ActionType.TRANSFER;
}

function performExecute(action: ActionType) {
  if (action === ActionType.DELETE) {
    if (selectedObject.value) {
      executeDelete({ id: selectedObject.value.id });
    }
  } else if (action === ActionType.TRANSFER) {
    if (selectedObject.value) {
      const data: AddToInventoryDto = {
        productId: selectedObject.value.productId,
        progress: selectedObject.value.progress,
        workSizes: selectedObject.value.workSizes.map((item) => ({
          id: item.size.id,
          quantity: item.quantity,
        })),
        createdBy: userId,
        workId: selectedObject.value.id,
      };

      executeTransfer({ data });
    }
  }
}

watch(
  () => dialog.isVisible,
  (isOpen) => {
    if (!isOpen) {
      selectedObject.value = null;
    }
  },
);
</script>
