<template>
  <v-container :fluid="mobile" class="h-100 d-flex flex-column">
    <ProductTable />
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
definePageMeta({
  title: 'page.setting_products',
});
</script>
