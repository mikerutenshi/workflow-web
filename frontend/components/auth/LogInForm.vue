<template>
  <!-- <v-row align="center" class="flex-column"><AuthUsersTable /> </v-row> -->
  <v-container fluid>
    <v-row justify="center" align="center">
      <v-col class="translucent-background">
        <v-form
          @submit.prevent="execute({ data: form })"
          class="d-flex flex-column align-center"
        >
          <v-alert v-if="error" type="error">
            {{ errorMessage }}
          </v-alert>
          <v-text-field
            v-model="form.email"
            label="Email"
            @update:model-value="(val: string) => removeWhitespace(val,'email')"
            class="full-width"
          />
          <v-text-field
            v-model="form.password"
            :label="$t('auth.password')"
            @update:model-value="(val: string) => removeWhitespace(val,'password')"
            class="full-width"
          />
          <v-btn :loading="isFetching" type="submit">{{
            $t('auth.login')
          }}</v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped lang="sass">
.translucent-background
  background-color:$translucent-background

.full-width
  width: 100%
</style>

<script setup lang="ts">
import { useMutation } from 'villus';
import { useAuthStore } from '~/stores/auth';
import { LogInDocument } from '~/api/generated/types';

const errorMessage = ref('');
const { data, isFetching, execute, error } = useMutation(LogInDocument, {
  onError(err) {
    errorMessage.value =
      (err.graphqlErrors?.[0]?.extensions?.['originalError'] as string) ??
      err.message;
  },
});

type loginForm = { email: string; password: string };
const form = reactive({
  email: '',
  password: '',
} as loginForm);

const authStore = useAuthStore();
const localePath = useLocalePath();

function removeWhitespace(value: string, fieldKey: keyof loginForm) {
  form[fieldKey] = value.replace(/\s/g, '');
}

watch(data, (loginData) => {
  if (loginData?.logIn) {
    authStore.user = loginData.logIn;
    navigateTo(localePath('/'));
  }
});

watchEffect(() => {
  console.log(`Login Form => ${JSON.stringify(form)}`);
});
</script>
