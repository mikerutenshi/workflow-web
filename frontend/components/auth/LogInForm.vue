<template>
  <!-- <v-row align="center" class="flex-column"><AuthUsersTable /> </v-row> -->
  <v-container>
    <v-row justify="center" align="center">
      <v-col class="translucent-background">
        <v-form @submit.prevent="onSubmit" class="d-flex flex-column">
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
                    v-model="email"
                    label="Email"
                    @update:model-value="(val: string) => removeWhitespace(val,'email')"
                    class="full-width"
                    :error-messages="emailError"
                  />
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field
                    v-model="password"
                    :label="$t('auth.password')"
                    @update:model-value="(val: string) => removeWhitespace(val,'password')"
                    class="full-width"
                    :error-messages="passwordError"
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
import { AuthSchema } from '@shared/schemas';

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

const schema = toTypedSchema(AuthSchema);
const { handleSubmit, setValues } = useForm({
  validationSchema: schema,
  initialValues: form,
});
const { value: email, errorMessage: emailError } = useField('email');
const { value: password, errorMessage: passwordError } = useField('password');
const onSubmit = handleSubmit(async (values) => {
  // Optionally, sync VeeValidate values back to your form object
  Object.assign(form, values);

  // Use Villus to submit the mutation
  execute({ data: form });
});

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
