<template>
  <v-main>
    <ProductTable />
  </v-main>
</template>

<script setup>
import ProductTable from '~/components/product/ProductTable.vue';

definePageMeta({
  title: 'Products',
});
</script>
