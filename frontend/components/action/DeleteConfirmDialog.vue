<template>
  <v-dialog v-model="dialog">
    <v-card class="mx-auto">
      <v-card-title>Delete Confirmation</v-card-title>
      <v-card-text>{{
        `Are you sure you want to delete ${itemTitle}?`
      }}</v-card-text>
      <v-card-actions>
        <v-btn @click="handleConfirm">Yes</v-btn>
        <v-btn @click="dialog = false">No</v-btn>
      </v-card-actions>
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
  itemTitle: {
    type: String,
  },
});
const emit = defineEmits(['confirm']);

function handleConfirm() {
  dialog.value = false;
  emit('confirm');
}
</script>
