<template>
  <v-btn :loading="isFetching" color="primary" block @click="execute">
    {{ $t('auth.logout') }}
  </v-btn>
</template>

<script setup lang="ts">
import { useMutation } from 'villus';
import { useAuthStore } from '@/stores/auth';
import { LogOutDocument } from '~/api/generated/types';

const { t } = useI18n();
defineProps({
  label: {
    type: String,
    default: 'Log Out',
  },
});

const { error, execute, isFetching, isDone } = useMutation(LogOutDocument);
const localePath = useLocalePath();

const authStore = useAuthStore();
watchEffect(() => {
  if (!error.value && isDone.value) {
    authStore.user = null;
    navigateTo(localePath('login'));
  }
});
</script>
