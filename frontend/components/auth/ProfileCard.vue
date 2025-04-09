<template>
  <v-card v-if="authStore.user" width="400">
    <v-card-title> Hi, {{ authStore.user.email }} </v-card-title>
    <v-card-text>
      <ActionCheckMe />
      <ActionLogOut class="mt-2" />
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

// bypass login
// const { data, isFetching, execute, error } = useMutation(LogInDocument);
// execute({ data: { email: 'admin@email.com', password: 'KataKunci>2025' } });

// watch(data, (loginData) => {
//   if (loginData?.logIn) {
//     authStore.user = loginData.logIn;
//   }
// });
</script>
