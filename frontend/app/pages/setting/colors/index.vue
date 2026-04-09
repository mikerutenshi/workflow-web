<template>
  <v-container :fluid="mobile" class="h-100 d-flex flex-column">
    <ColorTable />
  </v-container>
</template>

<script setup lang="ts">
import { useDisplay } from 'vuetify';

const { mobile } = useDisplay();
definePageMeta({
  title: 'page.setting_colors',
});
</script>
