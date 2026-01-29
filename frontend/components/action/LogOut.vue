<template>
  <v-btn :loading="isFetching" color="primary" block @click="execute">
    {{ $t('auth.logout') }}
  </v-btn>
</template>

<script setup lang="ts">
import { useMutation } from 'villus';
import { useAuthStore } from '@/stores/auth';
import { LogOutDocument } from '~/api/generated/types';
import { CACHE_ME } from '~/utils/cache-tags';

const { t } = useI18n();
defineProps({
  label: {
    type: String,
    default: 'Log Out',
  },
});

const { error, execute, isFetching, isDone } = useMutation(LogOutDocument, {
  clearCacheTags: [CACHE_ME],
});
const localePath = useLocalePath();

const authStore = useAuthStore();
watchEffect(() => {
  if (!error.value && isDone.value) {
    authStore.user = null;
    navigateTo(localePath('login'));
  }
});
</script>
