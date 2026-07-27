<template>
  <v-container>
    <v-row justify="center" align="center">
      <v-col>
        <v-card class="" v-if="!isRegistered">
          <form @submit.prevent="onSubmit" class="d-flex flex-column">
            <v-card-title>
              {{ $t('page.register_new_user') }}
            </v-card-title>
            <v-card-text>
              <v-row v-if="createError || rolesError">
                <v-col>
                  <v-alert type="error">
                    {{ extractGraphQlError(createError || rolesError) }}
                  </v-alert>
                </v-col>
              </v-row>
              <v-select
                :label="$t('auth.request_role')"
                :items="rolesData?.getRoles"
                item-title="name"
                item-value="id"
                v-model="roleId.value.value"
                :error-messages="roleId.errorMessage.value"
                :loading="isFetchingRoles"
              >
                <template #item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="item.name"
                    :subtitle="item.description ?? ''"
                  >
                  </v-list-item>
                </template>
              </v-select>

              <v-text-field
                v-model="email.value.value"
                label="Email"
                :error-messages="email.errorMessage.value"
              />
              <v-row>
                <v-col>
                  <v-text-field
                    v-model="firstName.value.value"
                    :label="$t('label.first_name')"
                    :error-messages="firstName.errorMessage.value"
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    v-model="lastName.value.value"
                    :label="$t('label.last_name')"
                    :error-messages="lastName.errorMessage.value"
                  />
                </v-col>
              </v-row>

              <v-text-field
                :label="$t('auth.password')"
                v-model="password.value.value"
                :append-icon="show1 ? mdiEye : mdiEyeOff"
                @click:append="show1 = !show1"
                :type="show1 ? 'text' : 'password'"
                hint="At least 8 characters"
                :error-messages="password.errorMessage.value"
              />
              <v-text-field
                :label="$t('auth.repeat_password')"
                v-model="repeatPassword.value.value"
                :append-icon="show2 ? mdiEye : mdiEyeOff"
                @click:append="show2 = !show2"
                :type="show2 ? 'text' : 'password'"
                hint="At least 8 characters"
                :error-messages="repeatPassword.errorMessage.value"
              />
              <NuxtTurnstile v-model="token" />
            </v-card-text>
            <v-btn type="submit" block :loading="isCreating">{{
              $t('btn.register')
            }}</v-btn>
          </form>
        </v-card>
        <v-card v-else-if="isRegistered && createdData">
          <v-card-title>{{ $t('page.register_success') }}</v-card-title>
          <v-card-text>
            <v-row>
              <p>
                {{ $t('label.wait_for_activation') }}
              </p>
            </v-row>
            <v-row>
              <v-col>
                <p>{{ $t('label.role') }}</p>
              </v-col>
              <v-col>
                <p>{{ createdData?.createUser.role.name }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>Email:</p>
              </v-col>
              <v-col>
                <p>{{ createdData?.createUser.email }}</p>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <p>{{ $t('label.name') }}</p>
              </v-col>
              <v-col>
                <p>
                  {{
                    `${createdData?.createUser.firstName} ${createdData?.createUser.lastName ?? ''}`
                  }}
                </p>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
import { mdiEye, mdiEyeOff } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import { CreateUserDocument, GetRolesDocument } from '~/api/generated/types';
import { CACHE_ROLES } from '~/utils/cache-tags';
import { RegisterSchema } from '~/validation/schema';

const token = ref('');
const { t } = useI18n();
const {
  data: rolesData,
  isFetching: isFetchingRoles,
  execute: fetchRoles,
  error: rolesError,
} = useQuery({
  query: GetRolesDocument,
  tags: [CACHE_ROLES],
});

// const snack = useSnackbarStore();
const {
  data: createdData,
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateUserDocument, {
  onData(data) {
    // snack.show(t('status.saved'), SnackColor.Success);
    isRegistered.value = true;
  },
});

const validationSchema = toTypedSchema(RegisterSchema);
const { handleSubmit, values } = useForm({
  validationSchema,
});
const roleId = useField('roleId');
const email = useField('email');
const firstName = useField('firstName');
const lastName = useField('lastName');
const password = useField('password');
const repeatPassword = useField('repeatPassword');

const onSubmit = handleSubmit(async (values) => {
  const { repeatPassword, ...rest } = values;
  const turnstile = await $fetch('/api/validateTurnstile', {
    method: 'POST',
    body: { token: token.value },
  });

  if (turnstile.success) executeCreate({ data: rest });
});

const show1 = ref(false);
const show2 = ref(false);
const isRegistered = ref(false);

watchEffect(() => {
  if (email.value.value !== null && email.value.value !== undefined) {
    email.value.value = String(email.value.value).toLowerCase();
  }
});
// watchEffect(() => {
//   console.log(`Token => ${JSON.stringify(token.value)}`);
//   console.log(`Form => ${JSON.stringify(values)}`);
// });
</script>
