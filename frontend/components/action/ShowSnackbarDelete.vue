<template>
  <v-snackbar v-model="isVisible" :color="color" :timeout="timeout"
    >{{ $t('status.deleted') }}
    <template #actions>
      <v-btn color="white" @click="emit('close-dialog')">
        {{ $t('label.ok') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
const isVisible = defineModel({ default: false });
const props = defineProps({
  timeout: {
    type: Number,
    default: 4000,
  },
  color: {
    type: String,
    default: 'error',
  },
});

const emit = defineEmits(['close-dialog']);

watch(isVisible, (newState) => {
  if (newState == false) {
    emit('close-dialog');
  }
});
</script>
