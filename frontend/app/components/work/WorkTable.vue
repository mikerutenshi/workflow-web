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
import { jsPDF } from 'jspdf';
import autoTable, { type RowInput } from 'jspdf-autotable';
import { useMutation, useQuery } from 'villus';
import { useDate } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  AddToInventoryDocument,
  DeleteWorkDocument,
  GetWorksDocument,
  Job,
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
  refetchTags: [CACHE_WORKS, CACHE_INV_PRODUCTS],
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

const { registerPrint, unregisterPrint } = useWorkPrint();
onMounted(() => registerPrint(printSlips));
onUnmounted(() => unregisterPrint());

// One A4 sheet holds 8 equal-height strips meant to be guillotine-cut apart, so
// every strip is drawn at a fixed offset rather than flowed: a work order with
// one size and three tasks must occupy exactly as much paper as one with seven
// sizes and six, or the cuts stop lining up through a stack.
const STRIPS_PER_PAGE = 8;
// Fixed at the width of the Job enum. Sizing the columns to each order's own
// task count would misalign the strips, and clamping to the observed maximum
// would silently drop a task from the printout.
const TASK_COLUMNS = Object.keys(Job).length;
// The ink in a strip runs from the header's cap top down to the write-on rule.
// Centring that block in its band leaves equal whitespace above and below; it
// used to sit 2.7mm under the cut line above it, which left nothing to cut into.
const CONTENT_BLOCK_HEIGHT = 21.8; // header cap top (+2.7) to the rule (+24.5)
const HEADER_CAP_TOP = 2.7; // content origin down to that cap top (+5 baseline, 2.3 cap)

// Plain codepoint ordering: skuNumeric values are zero-padded and some carry
// an "ST" suffix, so ICU collation buys nothing over a straight compare.
const compare = (a: string, b: string) => (a < b ? -1 : a > b ? 1 : 0);
// Quantities per EU size, merged across however many orders are handed in --
// one work order for a detail row, a whole product group for a subtotal.
const sizeTotals = (works: WorkData[]) => {
  const totals = new Map<string, number>();
  for (const work of works)
    for (const { size, quantity } of work.workSizes)
      totals.set(size.eu, (totals.get(size.eu) ?? 0) + quantity);
  return [...totals]
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([eu, quantity]) => `${eu}: ${quantity}`)
    .join('    ');
};
const renderSizes = (work: WorkData) => sizeTotals([work]);
const pairsOf = (work: WorkData) =>
  work.workSizes.reduce((pairs, size) => pairs + size.quantity, 0);

function printSlips() {
  // Only orders this app issued, and only those with work still outstanding:
  // external order numbers are printed by the system that issued them, and a
  // finished order needs no slip. The printout follows the toolbar date range.
  const slips = (computedWorks.value ?? []).filter(
    (work) =>
      work.orderNo.startsWith(`${Operation.Work}-`) &&
      work.tasks.some((task) => !task.doneAt),
  );

  if (!slips.length) {
    snack.show(t('status.nothing_to_print'), SnackColor.Info);
    return;
  }

  const totalPairs = slips.reduce((sum, work) => sum + pairsOf(work), 0);

  const doc = new jsPDF(); // A4 portrait in mm, matching PrintInvTrf
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 10;
  const contentWidth = pageWidth - margin * 2;
  const stripHeight = (pageHeight - margin * 2) / STRIPS_PER_PAGE;
  const cellWidth = contentWidth / TASK_COLUMNS;
  const right = margin + contentWidth;

  // Page 1 is a materials list for whoever pulls stock for the run: the same
  // batch as the strips, but ordered by product number instead of by date, so
  // the same shoe in different colourways sits together. It is meant to be
  // taken off the top of the stack before the rest is cut up.
  const materials = [...slips].sort(
    (a, b) =>
      compare(
        a.product.productGroup.skuNumeric,
        b.product.productGroup.skuNumeric,
      ) ||
      compare(a.product.sku, b.product.sku) ||
      compare(a.orderNo, b.orderNo),
  );

  // materials is already in skuNumeric order, so a change of key closes a run.
  // Each run gets a subtotal: its sizes summed across every order in the group,
  // which is the figure whoever pulls stock actually reads. Colourways keep
  // their own rows -- a product number often spans several, and the leather is
  // not interchangeable -- so only the subtotal combines them.
  const groups: { skuNumeric: string; works: WorkData[] }[] = [];
  for (const work of materials) {
    const key = work.product.productGroup.skuNumeric;
    const run = groups.at(-1);
    if (run?.skuNumeric === key) run.works.push(work);
    else groups.push({ skuNumeric: key, works: [work] });
  }

  const subtotalRows = new Set<number>();
  const materialsBody: RowInput[] = [];
  for (const group of groups) {
    for (const work of group.works) {
      materialsBody.push([
        adapter.format(work.date, 'normalDateWithWeekday'),
        work.orderNo,
        work.product.sku,
        renderSizes(work),
        String(pairsOf(work)),
      ]);
    }
    // Emitted even for a one-order group: the shaded row is what gets scanned
    // for, so it should never be sometimes-there.
    subtotalRows.add(materialsBody.length);
    materialsBody.push([
      {
        content: `${group.skuNumeric} ${t('label.subtotal')}`,
        colSpan: 3,
        styles: { halign: 'right' as const },
      },
      sizeTotals(group.works),
      String(group.works.reduce((sum, work) => sum + pairsOf(work), 0)),
    ]);
  }
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.text(t('page.works'), margin, margin + 6);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  doc.text(
    `${t('label.start_date')}: ${adapter.format(form.startDate, 'fullDate')}` +
      ` | ${t('label.end_date')}: ${adapter.format(form.endDate, 'fullDate')}`,
    margin,
    margin + 13,
  );

  autoTable(doc, {
    theme: 'grid',
    startY: margin + 18,
    margin: { top: margin, left: margin, right: margin, bottom: 15 },
    head: [
      [
        t('label.date'),
        t('label.order_no'),
        t('label.sku'),
        t('label.sizes'),
        t('label.quantity'),
      ],
    ],
    body: materialsBody,
    foot: [
      [
        '',
        '',
        '',
        { content: t('label.total'), styles: { halign: 'right' as const } },
        String(t('label.pairs', totalPairs)),
      ],
    ],
    didParseCell: (data) => {
      if (data.section === 'body' && subtotalRows.has(data.row.index)) {
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fillColor = [235, 238, 240];
      }
    },
    styles: { font: 'helvetica', fontSize: 9 },
    headStyles: { fillColor: [84, 123, 138] },
    footStyles: { fillColor: [84, 123, 138] },
    columnStyles: { 4: { halign: 'right' as const } },
  });

  doc.addPage();

  slips.forEach((work, index) => {
    const slot = index % STRIPS_PER_PAGE;
    if (index > 0 && slot === 0) doc.addPage();
    const stripTop = margin + slot * stripHeight;
    const top =
      stripTop + (stripHeight - CONTENT_BLOCK_HEIGHT) / 2 - HEADER_CAP_TOP;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.text(
      adapter.format(work.date, 'normalDateWithWeekday'),
      margin,
      top + 5,
    );
    doc.text(work.orderNo, pageWidth / 2, top + 5, { align: 'center' });
    doc.text(work.product.sku, right, top + 5, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.text(renderSizes(work), margin, top + 11);
    doc.text(`${t('label.total')}: ${pairsOf(work)}`, right, top + 11, {
      align: 'right',
    });

    work.tasks.slice(0, TASK_COLUMNS).forEach((task, column) => {
      const x = margin + column * cellWidth;

      doc.setFontSize(6.5);
      doc.setTextColor(120);
      doc.text(t(renderJob(task.type)), x, top + 18.5);
      doc.setTextColor(0);

      const artisan = task.artisan
        ? `${task.artisan.firstName} ${task.artisan.lastName ?? ''}`.trim()
        : '';
      doc.setFontSize(8);
      if (artisan) {
        doc.text(artisan, x, top + 24);
      } else {
        // Nobody assigned yet -- leave a rule for the floor to write the name on.
        doc.line(x, top + 24.5, x + cellWidth - 4, top + 24.5);
      }
    });

    doc.setLineDashPattern([1, 1], 0);
    doc.line(margin, stripTop + stripHeight, right, stripTop + stripHeight);
    doc.setLineDashPattern([], 0);
  });

  // Numbered in the bottom margin, below the last cut guide, so the label
  // never lands on a strip -- it leaves with the offcut. Same wording as
  // PrintInvTrf and the payroll summary.
  const pageCount = doc.internal.pages.length - 1;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(120);
  for (let page = 1; page <= pageCount; page++) {
    doc.setPage(page);
    doc.text(
      `${t('label.total')}: ${t('label.pairs', totalPairs)}`,
      margin,
      pageHeight - margin / 2,
    );
    doc.text(`Page ${page} of ${pageCount}`, right, pageHeight - margin / 2, {
      align: 'right',
    });
  }

  const stamp = (iso: string) => dayjs(iso).format('YYYYMMDD');
  doc.save(`works-${stamp(form.startDate)}-${stamp(form.endDate)}.pdf`);
}
</script>
