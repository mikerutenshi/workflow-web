<template>
  <v-btn
    :color="color"
    :loading="loading"
    :disabled="loading || disabled"
    :outlined="outlined"
    :prepend-icon="mdiBackspace"
    @click="handleClick"
    class="mr-4"
  >
    <slot>{{ $t('btn.cancel') }}</slot>
  </v-btn>
</template>

<script setup>
import { mdiBackspace } from '@mdi/js';
import { useRouter } from 'vue-router';

const props = defineProps({
  color: { type: String, default: 'secondary' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  prependIcon: { type: Boolean, default: false },
  text: { type: String, default: '' },
});

const emit = defineEmits(['click']);

const router = useRouter();
function handleClick(event) {
  emit('click', event);
  router.back();
}
</script>
