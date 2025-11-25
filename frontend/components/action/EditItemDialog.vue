<template>
  <v-dialog
    v-model="dialog"
    :fullscreen="mobile"
    :transition="mobile ? 'dialog-bottom-transition' : 'dialog-transition'"
    max-width="1800"
  >
    <v-card>
      <v-toolbar>
        <v-btn :icon="mdiClose" @click="closeDialog"></v-btn>
        <v-toolbar-title>{{ dialogTitle }}</v-toolbar-title>
      </v-toolbar>

      <v-container><slot></slot></v-container>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { mdiClose } from '@mdi/js';
import { useDisplay } from 'vuetify';
const { mobile } = useDisplay();
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
