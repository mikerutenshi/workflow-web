<template>
  <v-dialog v-model="dialog">
    <v-card class="mx-auto">
      <v-card-title
        :class="actionType === 'DELETE' ? 'bg-error' : 'bg-primary'"
        >{{ $t(CONFIRM_COPY[actionType].title) }}</v-card-title
      >
      <v-card-text>{{ $t(CONFIRM_COPY[actionType].text) }}</v-card-text>
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

type ConfirmAction = 'DELETE' | 'TRANSFER' | 'ADJUST';

const CONFIRM_COPY: Record<ConfirmAction, { title: string; text: string }> = {
  DELETE: { title: 'page.delete_confirm', text: 'label.delete_confirm' },
  TRANSFER: { title: 'page.transfer_confirm', text: 'label.transfer_confirm' },
  ADJUST: { title: 'page.post_adj_confirm', text: 'label.post_adj_confirm' },
};

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
    type: String as PropType<ConfirmAction>,
    default: 'DELETE',
    validator: (value: string) =>
      ['DELETE', 'TRANSFER', 'ADJUST'].includes(value),
  },
});
const emit = defineEmits(['confirm']);

function handleConfirm() {
  dialog.value = false;
  emit('confirm');
}
</script>
