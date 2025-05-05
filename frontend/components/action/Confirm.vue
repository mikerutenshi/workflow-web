<template>
  <v-btn
    :color="color"
    :loading="loading"
    :disabled="loading || disabled"
    :outlined="outlined"
    :prepend-icon="mdiCheckBold"
    @click="handleClick"
    type="submit"
    class="mr-4"
  >
    <slot>{{ text }}</slot>
  </v-btn>
</template>

<script setup>
import { mdiCheckBold } from '@mdi/js';
import { defineEmits, defineProps } from 'vue';

const props = defineProps({
  color: { type: String, default: 'primary' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  prependIcon: { type: Boolean, default: false },
  text: { type: String, default: 'OK' },
});

const emit = defineEmits(['click']);

function handleClick(event) {
  emit('click', event);
}
</script>
