<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="updateError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(updateError) }}
          </v-alert>
        </v-col>
      </v-row>

      <v-select
        :label="$t('label.status')"
        :items="progressList"
        v-model="progress.value.value"
        :error-messages="progress.errorMessage.value"
      >
      </v-select>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { useMutation } from 'villus';
import { UpdateInvTrfDocument } from '~/api/generated/types';
import { InvTrfUpdateProgressSchema } from '~/validation/schema';
import type { InvTrfTableRow } from './InvTrfTable.vue';

const { t } = useI18n();

const props = defineProps<{
  invTrfDto: InvTrfTableRow | null;
}>();

const authStore = useAuthStore();

const validationSchema = toTypedSchema(InvTrfUpdateProgressSchema);
const { handleSubmit, values } = useForm({
  validationSchema,
  initialValues: {
    id: props.invTrfDto?.id,
    progress: props.invTrfDto?.progress,
    updatedBy: authStore.user?.id,
  },
});

const emit = defineEmits(['form-submit']);

const progressList = getProgresses(authStore.user?.role.clearanceLevel).map(
  (value) => {
    return { value, title: t(`progress.${value}`) };
  },
);

const progress = useField('progress');

const snack = useSnackbarStore();

const {
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateInvTrfDocument, {
  onData(data) {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [
    CACHE_INV_TRFS,
    CACHE_INV_PRODUCTS,
    CACHE_INV_TRFS_PER_ITEM,
    CACHE_INV_TRF_ITEMS,
    CACHE_INV_TRF,
  ],
});

const onSubmit = handleSubmit((data) => {
  executeUpdate({
    id: data.id,
    data: {
      progress: data.progress,
      updatedBy: data.updatedBy,
    },
  });
});
</script>
