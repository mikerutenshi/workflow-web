<template>
  <v-btn :loading="isFetching" color="blue" block @click="execute">
    {{ label }}
  </v-btn>
</template>

<script setup lang="ts">
import { useMutation } from 'villus';
import { useAuthStore } from '@/stores/auth';
import { LogOutDocument } from '~/api/generated/types';

defineProps({
  label: {
    type: String,
    default: 'Log Out',
  },
});

const { error, execute, isFetching, isDone } = useMutation(LogOutDocument);

const authStore = useAuthStore();
watchEffect(() => {
  if (!error.value && isDone.value) {
    authStore.user = null;
    navigateTo('login');
  }
});
</script>
