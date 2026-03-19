<template>
  <v-btn
    :color="color"
    :loading="loading"
    :disabled="loading || disabled"
    :outlined="outlined"
    :prepend-icon="mdiTrashCan"
    @click="dialog = true"
  >
    <slot>{{ $t('btn.delete') }}</slot>
  </v-btn>
  <ActionConfirmDeleteDialog
    v-model="dialog"
    :item-title="itemTitle"
    @confirm="emit('click')"
  ></ActionConfirmDeleteDialog>
</template>

<script setup lang="ts">
import { mdiTrashCan } from '@mdi/js';

const props = defineProps({
  color: { type: String, default: 'secondary' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  prependIcon: { type: Boolean, default: false },
  text: { type: String, default: '' },
  itemTitle: { type: String, default: '' },
});
const dialog = ref(false);

const emit = defineEmits(['click']);
</script>
