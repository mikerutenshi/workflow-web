<template>
  <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
    <v-card>
      <v-toolbar>
        <v-btn :icon="mdiClose" @click="closeDialog"></v-btn>
        <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
      </v-toolbar>

      <v-container class="h-100 d-flex flex-column"><slot></slot></v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js';
const dialog = defineModel({
  type: Boolean,
  required: true,
  default: false,
});
const props = defineProps({
  dialogTitle: {
    type: String,
    default: 'Edit Item',
  },
});

function closeDialog() {
  dialog.value = false;
}
</script>
