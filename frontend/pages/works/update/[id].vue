<template>
  <v-container class="d-flex flex-column">
    <WorkCreateForm />
    <v-divider class="my-4"></v-divider>
    <TaskUpdateForm />
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'page.work_edit',
});
</script>
