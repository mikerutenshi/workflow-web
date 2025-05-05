<template>
  <v-btn
    :color="color"
    :loading="loading"
    :disabled="loading || disabled"
    :outlined="outlined"
    :prepend-icon="mdiTrashCan"
    @click="handleClick"
    type="submit"
    class="ml-auto"
  >
    <slot>{{ $t('btn.delete') }}</slot>
  </v-btn>
</template>

<script setup>
import { mdiTrashCan } from '@mdi/js';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  color: { type: String, default: 'error' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  prependIcon: { type: Boolean, default: false },
  text: { type: String, default: '' },
});

const emit = defineEmits(['click']);

function handleClick(event) {
  emit('click', event);
}
</script>
