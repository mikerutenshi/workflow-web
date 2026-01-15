<template>
  <v-dialog v-model="dialog">
    <v-card class="mx-auto">
      <v-card-title>{{ $t('page.delete_confirm') }}</v-card-title>
      <v-card-text>{{
        $t('label.delete_confirm', { item: itemTitle })
      }}</v-card-text>
      <v-card-actions>
        <v-btn @click="handleConfirm">{{ $t('btn.yes') }}</v-btn>
        <v-btn @click="dialog = false">{{ $t('btn.no') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
const dialog = defineModel({
  type: Boolean,
  required: true,
  default: false,
});
const props = defineProps({
  itemTitle: {
    type: String,
    default: '',
  },
});
const emit = defineEmits(['confirm']);

function handleConfirm() {
  dialog.value = false;
  emit('confirm');
}
</script>
