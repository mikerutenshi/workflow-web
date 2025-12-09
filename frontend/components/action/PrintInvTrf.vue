<template>
  <v-btn
    :color="color"
    :loading="loading"
    :disabled="loading || disabled"
    :outlined="outlined"
    :prepend-icon="mdiPrinter"
    @click="handleClick"
  >
    {{ $t('btn.print') }}
  </v-btn>
</template>

<script setup lang="ts">
import { mdiPrinter } from '@mdi/js';
import type { InvTrfDto } from '~/api/generated/types';

const props = defineProps({
  color: { type: String, default: 'primary' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  outlined: { type: Boolean, default: false },
  invTrfDto: {
    type: Object as PropType<InvTrfDto | null>,
    required: true,
  },
});

function handleClick() {}
</script>
