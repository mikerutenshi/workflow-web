<template>
  <v-container class="h-100 d-flex flex-column">
    <InvProductTable />
  </v-container>
</template>

<script setup lang="ts">
import InvProductTable from '~/components/inventory/InvProductTable.vue';

definePageMeta({
  title: 'page.inventory',
});
</script>
