<template>
  <v-row align="center" class="flex-column"><AuthUsersTable /> </v-row>
  <v-row align="center" class="mt-8">
    <v-container class="translucent-background">
      <v-form @submit.prevent="execute({ data: form })">
        <v-alert v-if="error" type="error">
          {{ error }}
        </v-alert>
        <v-text-field v-model="form.email" label="Email" />
        <v-text-field v-model="form.password" label="Password" />
        <v-btn :loading="isFetching" type="submit">Sign In</v-btn>
      </v-form>
    </v-container>
  </v-row>
</template>

<style lang="sass">
.translucent-background
  background-color: rgba(255, 255, 255, 0.8)
</style>

<script setup lang="ts">
import { useMutation } from "villus";
import { useAuthStore } from "~/stores/auth";
import { SignInDocument } from "~/api/generated/types";
import { AuthProfileCard, AuthUsersTable } from "#components";

const { data, isFetching, execute, error } = useMutation(SignInDocument);
const authStore = useAuthStore();
const form = reactive({
  email: "",
  password: "",
});

watchEffect(() => {
  authStore.user = data.value?.signIn || null;
});
</script>
