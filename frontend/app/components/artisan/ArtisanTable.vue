<template>
  <v-data-table
    :headers="headers"
    :items="data?.getArtisans"
    :loading="isFetching"
    class="flex-grow-1"
    item-value="id"
    fixed-header
    :height="`calc(100vh - 225px)`"
    hover
    :page="pageNo"
    :items-per-page="itemsPerPage"
  >
    <template #loading>
      <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
    </template>

    <template v-slot:item.jobs="{ item }">
      {{ item.jobs.map((job) => $t(renderJob(job))).join(', ') }}
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn
        v-if="clearanceLevel <= Role.Finance"
        color="primary"
        :icon="mdiPencil"
        variant="text"
        @click="showDialog(item.id)"
      ></v-btn>
    </template>
  </v-data-table>

  <ActionEditItemDialog
    :dialog-title="
      dialog.content === DialogContent.Edit ? $t('page.artisan_edit') : 'Title'
    "
    v-model="dialog.isVisible"
  >
    <template v-if="dialog.content === DialogContent.Edit">
      <ArtisanCreateForm
        :artisan-id="selectionId"
        @form-submit="handleDialogClose"
      ></ArtisanCreateForm>
    </template>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetArtisansDocument } from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const pageNo = ref(1);
const itemsPerPage = ref(25);
const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 99;

const {
  data,
  isFetching,
  execute: executeFetch,
} = useQuery({
  query: GetArtisansDocument,
  tags: [CACHE_ARTISANS],
});

const { t } = useI18n();
const headers: ReadOnlyHeaders = [
  // { title: t('label.id'), key: 'id' },
  { title: t('label.first_name'), key: 'firstName' },
  { title: t('label.last_name'), key: 'lastName' },
  { title: t('label.jobs'), key: 'jobs' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];

const selectionId = ref('');
enum DialogContent {
  None = 'NONE',
  Edit = 'EDIT',
}

const dialog = reactive({
  isVisible: false,
  content: DialogContent.None,
});
function showDialog(productId: string) {
  selectionId.value = productId;
  dialog.content = DialogContent.Edit;
  dialog.isVisible = true;
}
function handleDialogClose() {
  dialog.isVisible = false;
  selectionId.value = '';
  executeFetch();
}
watch(
  () => dialog.isVisible,
  (isVisible) => {
    if (!isVisible) {
      handleDialogClose();
    }
  },
);
</script>
