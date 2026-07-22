<template>
  <v-dialog v-model="dialog">
    <v-card class="mx-auto">
      <v-card-title
        :class="actionType === 'DELETE' ? 'bg-error' : 'bg-primary'"
        >{{
          actionType === 'DELETE'
            ? $t('page.delete_confirm')
            : $t('page.transfer_confirm')
        }}</v-card-title
      >
      <v-card-text>{{
        actionType === 'DELETE'
          ? $t('label.delete_confirm')
          : $t('label.transfer_confirm')
      }}</v-card-text>
      <v-card-actions>
        <v-btn :loading="loading" @click="handleConfirm">{{
          $t('btn.yes')
        }}</v-btn>
        <v-btn @click="dialog = false">{{ $t('btn.no') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const dialog = defineModel({
  type: Boolean,
  required: true,
  default: false,
});
const props = defineProps({
  itemName: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  actionType: {
    type: String as PropType<'DELETE' | 'TRANSFER'>,
    default: 'DELETE',
    validator: (value: string) => ['DELETE', 'TRANSFER'].includes(value),
  },
});
const emit = defineEmits(['confirm']);

function handleConfirm() {
  dialog.value = false;
  emit('confirm');
}
</script>
