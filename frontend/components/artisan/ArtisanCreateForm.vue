<template>
  <v-form @submit.prevent="handleSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-alert v-if="errorMessage" type="error">
          {{ errorMessage }}
        </v-alert>
        <v-row>
          <v-col>
            <v-text-field
              v-model="form.firstName"
              :label="$t('label.first_name')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              @blur="onBlur"
              v-model="form.lastName"
              :label="$t('label.last_name')"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              v-model="form.jobs"
              :items="jobOptions"
              :return-object="false"
              :label="$t('label.select_jobs')"
              multiple
              chips
              auto-select-first
              item-title="title"
              item-value="id"
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
  </v-form>
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
const errorMessage = ref('');
const form = reactive({
  firstName: '',
  lastName: undefined as string | undefined,
  jobs: [] as Job[],
  createdBy: userId,
  updatedBy: undefined as string | undefined,
});
const localePath = useLocalePath();
const { execute: executeCreate, isFetching: isCreating } = useMutation(
  CreateArtisanDocument,
  {
    onData() {
      navigateTo(localePath('/artisans'));
    },
    onError(err) {
      errorMessage.value =
        JSON.stringify(err.graphqlErrors?.[0]?.extensions?.['originalError']) ??
        err.message;
    },
    clearCacheTags: [CACHE_ARTISANS],
  }
);
const { execute: executeUpdate, isFetching: isUpdating } = useMutation(
  UpdateArtisanDocument,
  {
    onData() {
      navigateTo(localePath('/artisans'));
    },
    onError(err) {
      errorMessage.value =
        JSON.stringify(
          err.graphqlErrors?.[0]?.extensions?.['originalError'] as string
        ) ?? err.message;
    },
    clearCacheTags: [CACHE_ARTISANS, CACHE_ARTISAN],
  }
);
const { execute: executeDelete } = useMutation(DeleteArtisanDocument, {
  clearCacheTags: [CACHE_ARTISANS],
  onData() {
    navigateTo(localePath('/artisans'));
  },
  onError(err) {
    alert(`Error while deleting artisan -> ${err}`);
  },
});
const onBlur = () => {
  form.lastName = form.lastName === '' ? undefined : form.lastName;
};

if (artisanId.value) {
  useQuery({
    query: GetArtisanDocument,
    variables: { id: artisanId.value },
    tags: [CACHE_ARTISAN],
    onData(artisanData) {
      const artisan = artisanData.getArtisan;
      if (artisan) {
        form.firstName = artisan.firstName;
        if (artisan.lastName) form.lastName = artisan.lastName;
        form.jobs = artisan.jobs;
        form.createdBy = artisan.createdBy;
        form.updatedBy = userId;
      }
    },
  });
}
function handleSubmit() {
  if (artisanId.value) {
    executeUpdate({ id: artisanId.value, data: form });
  } else {
    executeCreate({ data: form });
  }
}

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
