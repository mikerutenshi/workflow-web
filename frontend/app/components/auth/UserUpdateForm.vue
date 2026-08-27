<template>
  <form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="errorUpdate">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(errorUpdate) }}
          </v-alert>
        </v-col>
      </v-row>

      <p>{{ `Email: ${user?.email}` }}</p>
      <p>{{ `Full Name: ${user?.firstName} ${user?.lastName}` }}</p>

      <template v-if="user && user?.role.clearanceLevel > 0">
        <v-select
          v-model="roleId.value.value"
          :items="dataRoles?.getRoles"
          :return-object="false"
          label="Select Role"
          chips
          item-title="name"
          item-value="id"
          :error-messages="roleId.errorMessage.value"
        ></v-select>

        <v-switch
          label="Activation"
          v-model="isActive.value.value"
          :true-icon="mdiHeart"
          :false-icon="mdiGraveStone"
        ></v-switch>
      </template>

      <v-select
        v-model="inventories"
        return-object
        :items="
          dataInventories?.getInventories.map((i) => ({
            value: i.id,
            title: i.name,
          }))
        "
        label="Inventories"
        multiple
        chips
        :error-messages="errors[`invIds`]"
        clearable
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm>{{ 'Save' }}</ActionConfirm>
    </v-card-actions>
  </form>
</template>

<script setup lang="ts">
import { mdiGraveStone, mdiHeart } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import type { PropType } from 'vue';
import {
  GetInventoriesDocument,
  GetRolesDocument,
  UpdateUserDocument,
  type GetUsersQuery,
} from '~/api/generated/types';
import { UserSchema } from '~/validation/schema';

const { t } = useI18n();
type UserData = GetUsersQuery['getUsers'][number];
const props = defineProps({
  user: {
    type: [Object, null] as PropType<UserData | null>,
    required: true,
  },
});
const emit = defineEmits(['form-submit']);
const { data: dataRoles } = useQuery({ query: GetRolesDocument });
const { data: dataInventories } = useQuery({ query: GetInventoriesDocument });

const snack = useSnackbarStore();
const { execute: executeUpdate, error: errorUpdate } = useMutation(
  UpdateUserDocument,
  {
    onData(data) {
      emit('form-submit');
      snack.show(t('status.saved'), SnackColor.Success);
    },
    refetchTags: [CACHE_USERS],
  },
);

const userStored = useAuthStore().user;
const validationSchema = toTypedSchema(UserSchema);
const { handleSubmit, errors, values } = useForm({
  validationSchema,
  initialValues: {
    roleId: props.user?.role.id,
    isActive: props.user?.isActive,
    invIds: props.user?.userInventories.map((inv) => inv.id),
  },
});
const roleId = useField('roleId');
const isActive = useField('isActive');

const invIds = useFieldArray('invIds');
const inventories: Ref<{ value: string; title: string }[]> = ref(
  props.user?.userInventories.map((inventory) => ({
    value: inventory.id,
    title: inventory.name,
  })) ?? [],
);
const onSubmit = handleSubmit((values) => {
  if (props.user) executeUpdate({ id: props.user.id, data: values });
});

watch(inventories, (newInventories) => {
  invIds.replace(newInventories.map((inventory) => inventory.value));
});
</script>
