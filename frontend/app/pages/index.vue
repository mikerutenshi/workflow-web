<template>
  <v-container fluid class="h-100 d-flex flex-column">
    <AuthProfileCard />

    <v-card rounded variant="flat" class="mt-4">
      <v-card-title>{{ $t('label.sales_performance') }}</v-card-title>
      <v-card-text>
        <SalePerformanceTable />
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'app.title',
});
</script>
