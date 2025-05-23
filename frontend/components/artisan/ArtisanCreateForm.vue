<template>
  <form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row v-if="createError || updateError">
          <v-col>
            <v-alert type="error">
              {{
                extractGraphQlError(createError) ||
                extractGraphQlError(updateError)
              }}
            </v-alert>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="firstName.value.value"
              :label="$t('label.first_name')"
              :error-messages="firstName.errorMessage.value"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="lastName.value.value"
              :label="$t('label.last_name')"
              :error-messages="lastName.errorMessage.value"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              v-model="jobs.value.value"
              :items="jobOptions"
              :return-object="false"
              :label="$t('label.select_jobs')"
              multiple
              chips
              auto-select-first
              item-title="title"
              item-value="id"
              :error-messages="jobs.errorMessage.value"
            ></v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row class="flex-grow-1"></v-row>

    <v-row align="end" class="ma-1">
      <ActionCancel></ActionCancel>
      <ActionConfirm v-if="artisanId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
      <ActionDelete
        v-if="artisanId"
        @click="executeDelete({ id: artisanId })"
      ></ActionDelete>
    </v-row>
  </form>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import {
  CreateArtisanDocument,
  DeleteArtisanDocument,
  GetArtisanDocument,
  Job,
  UpdateArtisanDocument,
} from '~/api/generated/types';
import { useRoute } from 'vue-router';
import { ArtisanSchema } from '~/validation/schema';

const route = useRoute();
const artisanId = ref(route.params.id as string);
const authStore = useAuthStore();
const userId = authStore.user?.id ?? '';
const { t } = useI18n();
const jobOptions = computed(() =>
  (Object.keys(JOBS) as Array<keyof typeof JOBS>).map((key) => ({
    id: key,
    title: t(JOBS[key]),
  }))
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
    navigateTo(localePath('/artisans'));
  },
  clearCacheTags: [CACHE_ARTISANS],
});
const {
  execute: executeUpdate,
  isFetching: isUpdating,
  error: updateError,
} = useMutation(UpdateArtisanDocument, {
  onData() {
    navigateTo(localePath('/artisans'));
  },
  clearCacheTags: [CACHE_ARTISANS, CACHE_ARTISAN],
});
const { execute: executeDelete } = useMutation(DeleteArtisanDocument, {
  clearCacheTags: [CACHE_ARTISANS],
  onData() {
    navigateTo(localePath('/artisans'));
  },
  onError(err) {
    alert(`Error while deleting artisan -> ${err}`);
  },
});

if (artisanId.value) {
  useQuery({
    query: GetArtisanDocument,
    variables: { id: artisanId.value },
    tags: [CACHE_ARTISAN],
    onData(artisanData) {
      const artisan = artisanData.getArtisan;
      if (artisan) {
        firstName.setValue(artisan.firstName);
        lastName.setValue(artisan.lastName);
        jobs.setValue(
          artisan.jobs && artisan.jobs.length > 0
            ? (artisan.jobs as [Job, ...Job[]])
            : [Job.DrawUpper]
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
  if (artisanId.value) {
    executeUpdate({
      id: artisanId.value,
      data: {
        ...values,
        jobs: values.jobs as Job[],
        lastName: values.lastName === '' ? null : values.lastName,
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
