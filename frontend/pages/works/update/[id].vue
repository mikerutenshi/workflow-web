<template>
  <v-container class="h-100 d-flex flex-column">
    <template v-if="clearanceLevel <= Role.Planner">
      <WorkCreateForm />
      <v-divider class="my-4"></v-divider>
    </template>
    <WorkHeader v-if="clearanceLevel >= Role.Field" class="mb-4"></WorkHeader>
    <TaskUpdateForm />
  </v-container>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const clearanceLevel = authStore.user?.role.clearanceLevel ?? 6;
definePageMeta({
  title: 'page.work_edit',
});
</script>
