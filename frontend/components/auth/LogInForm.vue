<template>
  <!-- <v-row align="center" class="flex-column"><AuthUsersTable /> </v-row> -->
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" md="4" class="translucent-background">
        <v-form
          @submit.prevent="execute({ data: form })"
          class="d-flex flex-column align-center"
        >
          <v-alert v-if="error" type="error">
            {{ error }}
          </v-alert>
          <v-text-field v-model="form.email" label="Email" class="full-width" />
          <v-text-field
            v-model="form.password"
            label="Password"
            class="full-width"
          />
          <v-btn :loading="isFetching" type="submit">Log In</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style lang="sass">
.translucent-background
  background-color:$translucent-background

.full-width
  width: 100%
</style>

<script setup lang="ts">
import { useMutation } from 'villus';
import { useAuthStore } from '~/stores/auth';
import { LogInDocument } from '~/api/generated/types';

const { data, isFetching, execute, error } = useMutation(LogInDocument);

const form = reactive({
  email: '',
  password: '',
});

const authStore = useAuthStore();

watch(data, (loginData) => {
  if (loginData?.logIn) {
    authStore.user = loginData.logIn;
    navigateTo('/');
  }
});
</script>
