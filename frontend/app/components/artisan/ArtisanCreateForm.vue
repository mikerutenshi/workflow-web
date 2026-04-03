<template>
  <form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError || updateError || deleteError">
        <v-col>
          <v-alert type="error">
            {{
              extractGraphQlError(createError) ||
              extractGraphQlError(updateError) ||
              extractGraphQlError(deleteError)
            }}
          </v-alert>
        </v-col>
      </v-row>
      <v-text-field
        v-model="firstName.value.value"
        :label="$t('label.first_name')"
        :error-messages="firstName.errorMessage.value"
      />

      <v-text-field
        v-model="lastName.value.value"
        :label="$t('label.last_name')"
        :error-messages="lastName.errorMessage.value"
      />

      <v-select
        v-model="jobs.value.value"
        :items="jobOptions"
        :return-object="false"
        :label="$t('label.select_jobs')"
        multiple
        chips
        item-title="title"
        item-value="id"
        :error-messages="jobs.errorMessage.value"
      ></v-select>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionDelete
        v-if="artisanId"
        @click="executeDelete({ id: artisanId })"
      ></ActionDelete>
      <ActionConfirm v-if="artisanId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-card-actions>
  </form>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @on-confirm="emit('close-dialog')"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import { useRoute } from 'vue-router';
import {
  CreateArtisanDocument,
  DeleteArtisanDocument,
  GetArtisanDocument,
  Job,
  UpdateArtisanDocument,
} from '~/api/generated/types';
import { ArtisanSchema } from '~/validation/schema';

const { t } = useI18n();
const route = useRoute();
const props = defineProps({
  artisanId: {
    type: String,
  },
});
const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const artisanId = (route.params.id as string) || props.artisanId;
const authStore = useAuthStore();
const userId = authStore.user?.id ?? '';
const jobOptions = computed(() =>
  (Object.keys(JOBS) as Array<keyof typeof JOBS>).map((key) => ({
    id: key,
    title: t(JOBS[key]),
  })),
);
const validationSchema = toTypedSchema(ArtisanSchema);
const {
  handleSubmit,
  // values: formValues,
  setValues,
} = useForm({
  validationSchema,
  initialValues: {
    createdBy: userId,
  },
});
const firstName = useField('firstName');
const lastName = useField('lastName');
const jobs = useField<Job[]>('jobs');

const localePath = useLocalePath();
const {
  execute: executeCreate,
  isFetching: isCreating,
  error: createError,
} = useMutation(CreateArtisanDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_ARTISANS],
});
const {
  execute: executeUpdate,
  isFetching: isUpdating,
  error: updateError,
} = useMutation(UpdateArtisanDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_ARTISANS, CACHE_ARTISAN],
});
const { execute: executeDelete, error: deleteError } = useMutation(
  DeleteArtisanDocument,
  {
    clearCacheTags: [CACHE_ARTISANS],
    onData(data) {
      if (data.deleteArtisan) {
        snack.message = `${t('status.deleted')}`;
      } else {
        snack.color = SnackColor.Error;
        snack.message = `${t('status.failed')}`;
      }
      snack.isVisible = true;
    },
  },
);

if (artisanId) {
  useQuery({
    query: GetArtisanDocument,
    variables: { id: artisanId },
    tags: [CACHE_ARTISAN],
    onData(artisanData) {
      const artisan = artisanData.getArtisan;
      if (artisan) {
        firstName.setValue(artisan.firstName);
        lastName.setValue(artisan.lastName);
        jobs.setValue(
          artisan.jobs && artisan.jobs.length > 0
            ? (artisan.jobs as [Job, ...Job[]])
            : [Job.DrawUpper],
        );

        setValues({
          createdBy: artisan.createdBy,
          updatedBy: artisan.updatedBy,
        });
      }
    },
  });
}

const onSubmit = handleSubmit((values) => {
  if (artisanId) {
    executeUpdate({
      id: artisanId,
      data: {
        ...values,
        jobs: values.jobs as Job[],
        lastName: values.lastName === '' ? null : values.lastName,
        updatedBy: userId,
      },
    });
  } else {
    executeCreate({ data: { ...values, jobs: values.jobs as Job[] } });
  }
});

// watchEffect(() => {
//   console.log(JSON.stringify(formValues));
// });
</script>
