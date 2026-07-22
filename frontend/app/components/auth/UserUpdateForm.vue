<template>
  <v-card-text>
    <p>{{ userId }}</p>
  </v-card-text>
  <v-card-actions>
    <v-spacer></v-spacer>
    <ActionConfirm>{{ 'Save' }}</ActionConfirm>
  </v-card-actions>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';

const props = defineProps({
  userId: {
    type: [String, null] as PropType<String | null>,
    required: true,
  },
});
</script>
