<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <form @submit.prevent="onSubmit">
          <v-card class="translucent-background">
            <v-card-text>
              <v-row v-if="error">
                <v-col>
                  <v-alert type="error">
                    {{ extractGraphQlError(error) }}
                  </v-alert>
                </v-col>
              </v-row>

              <v-text-field
                v-model="email.value.value"
                label="Email"
                :error-messages="email.errorMessage.value"
              />

              <v-text-field
                v-model="password.value.value"
                :label="$t('auth.password')"
                :append-icon="showPassword ? mdiEye : mdiEye"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :error-messages="password.errorMessage.value"
              />
            </v-card-text>
            <v-btn :loading="isFetching" type="submit" block rounded="0">{{
              $t('auth.login')
            }}</v-btn>
          </v-card>
        </form>
      </v-col>
    </v-row>
    <v-bottom-sheet>
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn
          v-bind="activatorProps"
          :icon="mdiChevronUp"
          class="position-absolute bottom-0 right-0 ma-4"
        ></v-btn>
      </template>
      <AuthRegisterForm></AuthRegisterForm>
    </v-bottom-sheet>
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
import { AuthSchema } from '~/validation/schema';
import { mdiChevronUp, mdiChevronUpCircleOutline, mdiEye } from '@mdi/js';

const { data, isFetching, execute, error } = useMutation(LogInDocument);

const validationSchema = toTypedSchema(AuthSchema);
const { handleSubmit, values } = useForm({
  validationSchema,
});
const email = useField('email');
const password = useField('password');

const onSubmit = handleSubmit((values) => {
  execute({ data: values });
});

const authStore = useAuthStore();
const localePath = useLocalePath();
const showPassword = ref(false);

watch(data, async (loginData) => {
  if (loginData?.logIn) {
    const loginCookie = useCookie('isLoggedIn');
    loginCookie.value = '1';
    authStore.user = loginData.logIn;
    await navigateTo(localePath('/'));
  }
});

// watchEffect(() => {
//   console.log(`Login Form => ${JSON.stringify(values)}`);
// });
</script>
