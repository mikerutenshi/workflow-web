<template>
  <v-data-table
    :headers="headers"
    fixed-header
    hover
    :items="data?.getUsers"
    item-key="id"
    :search="search"
    :height="`calc(100vh - 215px)`"
  >
    <template v-slot:item.createdAt="{ item }: { item: any }">
      {{ formatToLocalDate(item.createdAt) }}
    </template>

    <template #top>
      <v-text-field
        v-model="search"
        :label="$t('label.search')"
        :prepend-inner-icon="mdiMagnify"
        single-line
        hide-details
        density="compact"
        class="mx-4 my-2"
      ></v-text-field>
    </template>

    <template #item.actions="{ item }">
      <v-btn
        color="primary"
        :icon="mdiPencil"
        variant="text"
        @click="openEditUserDialog(item.id)"
      ></v-btn>
    </template>
  </v-data-table>

  <ActionEditItemDialog v-model="dialog.isVisible" :dialog-title="dialog.title">
    <AuthUserUpdateForm :user-id="dialog.userId"></AuthUserUpdateForm>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiMagnify, mdiPencil } from '@mdi/js';
import { useQuery } from 'villus';
import { ref } from 'vue';
import { GetUsersDocument } from '~/api/generated/types';

const { data } = useQuery({
  query: GetUsersDocument,
});

const search = ref('');

const headers = ref([
  { title: 'ID', key: 'id' },
  { title: 'Email', key: 'email' },
  { title: 'Role', key: 'role.name' },
  { title: 'First Name', key: 'firstName' },
  { title: 'Last Name', key: 'lastName' },
  { title: 'Is Active', key: 'isActive' },
  { title: 'Inventories', key: 'userInventories.name' },
  { title: 'Created At', key: 'createdAt' },
  { title: '', key: 'actions', sortable: false, align: 'end' },
]);

const dialog = reactive({
  isVisible: false,
  title: '',
  userId: null as String | null,
});

function formatToLocalDate(isoString: string) {
  const date = new Date(isoString); // Parse ISO string into a Date object
  return new Intl.DateTimeFormat(navigator.language, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false, // Use 12-hour format
  }).format(date);
}

function openEditUserDialog(userId: string) {
  dialog.userId = userId;
  dialog.title = 'Edit User';
  dialog.isVisible = true;
}

watchEffect(() => {
  if (!dialog.isVisible) {
    dialog.userId = null;
    dialog.title = '';
  }
});
</script>
