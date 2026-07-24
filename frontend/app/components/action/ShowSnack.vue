<template>
  <v-snackbar
    v-model="isVisible"
    :color="props.color"
    :timeout="props.timeout"
    :text="props.message"
  >
    <template #actions>
      <v-btn color="white" @click="emit('on-confirm')">
        {{ $t('label.ok') }}
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
const isVisible = defineModel({ default: false });
const { t } = useI18n();
const props = defineProps({
  timeout: {
    type: Number,
    default: 4000,
  },
  color: {
    type: String,
    default: SnackColor.Success,
  },
  message: {
    type: String,
    default: 'Snackbar Success',
  },
});
const emit = defineEmits(['on-confirm']);

watch(isVisible, (newState) => {
  if (newState == false) {
    emit('on-confirm');
  }
});
</script>
