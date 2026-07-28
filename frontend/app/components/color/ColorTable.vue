<template>
  <v-row v-if="error" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(error) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-row>
    <v-col class="d-flex flex-column">
      <v-data-table
        :headers="headers"
        :items="data?.getColors"
        :search="search"
        :loading="isFetching"
        item-value="id"
        hover
        fixed-header
        :height="`calc(100vh - 215px)`"
        :page="pageNo"
        :items-per-page="itemsPerPage"
      >
        <template #top>
          <v-text-field
            v-model="search"
            :label="$t('label.search')"
            :prepend-inner-icon="mdiMagnify"
            hide-details
            single-line
            density="compact"
            class="mx-4 my-2"
          ></v-text-field>
        </template>
        <template #loading>
          <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
        </template>

        <template v-slot:item.hexCode="{ item }">
          <div style="display: flex; flex-wrap: wrap; gap: 8px">
            <v-chip class="d-flex align-center">
              <div
                class="color-box"
                :style="{ backgroundColor: item.hexCode }"
              />
              <span>{{ item.hexCode }}</span>
            </v-chip>
          </div>
        </template>

        <template v-slot:item.actions="{ item }">
          <v-btn
            color="primary"
            :icon="mdiPencil"
            variant="text"
            @click="edit(item.id)"
          ></v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>

  <ActionEditItemDialog
    :dialogTitle="selectionId ? $t('page.color_edit') : $t('page.color_create')"
    v-model="dialog"
  >
    <ColorCreateForm
      :color-id="selectionId"
      @form-submit="
        dialog = false;
        execute();
      "
    ></ColorCreateForm>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiFileDocumentEditOutline, mdiMagnify, mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import type { VDataTable } from 'vuetify/components';
import { GetColorsDocument } from '~/api/generated/types';
type ReadOnlyHeaders = VDataTable['$props']['headers'];

const { execute, data, isFetching, error } = useQuery({
  query: GetColorsDocument,
  tags: [CACHE_COLORS],
});

const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 99;
const { t } = useI18n();
const headers: ReadOnlyHeaders = [
  ...(clearanceLevel === 0 ? [{ title: t('label.id'), key: 'id' }] : []),
  { title: t('label.name'), key: 'name' },
  { title: t('label.colors'), key: 'hexCode', minWidth: '140' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
];
const search = ref('');
const pageNo = ref(1);
const itemsPerPage = ref(25);
const dialog = ref(false);
const selectionId = ref<string | null>(null);

function edit(colorId: string) {
  dialog.value = true;
  selectionId.value = colorId;
}

watch(dialog, (isOpen) => {
  if (!isOpen) {
    selectionId.value = null;
  }
});
</script>
