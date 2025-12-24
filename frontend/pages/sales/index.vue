<template>
  <v-container class="h-100 d-flex flex-column">
    <sale-table></sale-table>
  </v-container>
</template>

<script setup lang="ts">
import SaleTable from '~/components/sale/SaleTable.vue';

definePageMeta({
  title: 'page.sales',
});
</script>
