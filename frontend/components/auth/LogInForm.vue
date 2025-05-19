<template>
  <!-- <v-row align="center" class="flex-column"><AuthUsersTable /> </v-row> -->
  <v-container>
    <v-row justify="center" align="center">
      <v-col class="translucent-background">
        <form @submit.prevent="onSubmit" class="d-flex flex-column">
          <v-row>
            <v-col>
              <v-row v-if="error">
                <v-col>
                  <v-alert type="error">
                    {{ errorMessage }}
                  </v-alert>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="email.value.value"
                    label="Email"
                    class="full-width"
                    :error-messages="email.errorMessage.value"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password.value.value"
                    :label="$t('auth.password')"
                    class="full-width"
                    :error-messages="password.errorMessage.value"
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-btn :loading="isFetching" type="submit" block>{{
                $t('auth.login')
              }}</v-btn>
            </v-col>
          </v-row>
        </form>
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
import { AuthSchema } from '@shared/schema';

const errorMessage = ref('');
const { data, isFetching, execute, error } = useMutation(LogInDocument, {
  onError(err) {
    errorMessage.value =
      (err.graphqlErrors?.[0]?.extensions?.['originalError'] as string) ??
      err.message;
  },
});

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

watch(data, (loginData) => {
  if (loginData?.logIn) {
    authStore.user = loginData.logIn;
    navigateTo(localePath('/'));
  }
});

// watchEffect(() => {
//   console.log(`Login Form => ${JSON.stringify(values)}`);
// });
</script>
