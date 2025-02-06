<template>
  <v-form @submit="execute({ data: form })">
    <v-alert v-if="error" type="error">
      {{ error }}
    </v-alert>
    <v-text-field v-model="form.email" label="Email" />
    <v-text-field v-model="form.password" label="Password" />
    <v-btn :loading="isFetching" type="submit">Sign In</v-btn>
  </v-form>
</template>

<script setup lang="ts">
import { useMutation } from "villus";
import { useAuthStore } from "~/stores/auth";
import { SignInDocument } from "~/api/generated/types";

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
