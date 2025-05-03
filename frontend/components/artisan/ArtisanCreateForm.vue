<template>
  <v-row justify="center">
    <v-col>
      <v-form class="pa-4" @submit.prevent="handleSubmit">
        <v-alert v-if="errorMessage" type="error">
          {{ errorMessage }}
        </v-alert>
        <v-text-field v-model="form.firstName" label="First Name" />
        <v-text-field
          @blur="onBlur"
          v-model="form.lastName"
          label="Last Name"
        />
        <v-combobox
          v-model="form.jobs"
          :items="jobOptions"
          :return-object="false"
          label="Seiect Jobs"
          multiple
          chips
          auto-select-first
          item-title="title"
          item-value="id"
        ></v-combobox>

        <div class="d-flex mt-4">
          <NuxtLink to="/artisans">
            <v-btn color="secondary" class="mr-4">Discard</v-btn>
          </NuxtLink>
          <v-btn
            v-if="!artisanId"
            :loading="isCreating"
            type="submit"
            color="primary"
            >Create</v-btn
          >
          <v-btn v-else :loading="isUpdating" type="submit" color="primary"
            >Update</v-btn
          >
          <v-btn
            v-if="artisanId"
            type="button"
            color="error"
            class="ml-auto"
            @click="executeDelete({ id: artisanId })"
            >Delete</v-btn
          >
        </div>
      </v-form>
    </v-col>
  </v-row>
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
const jobOptions = ref(JOB_OPTIONS);
const errorMessage = ref('');
const form = reactive({
  firstName: '',
  lastName: undefined as string | undefined,
  jobs: [] as Job[],
  createdBy: userId,
  updatedBy: undefined as string | undefined,
});
const { execute: executeCreate, isFetching: isCreating } = useMutation(
  CreateArtisanDocument,
  {
    onData() {
      navigateTo('/artisans');
    },
    onError(err) {
      errorMessage.value =
        (err.graphqlErrors?.[0]?.extensions?.['originalError'] as string) ??
        err.message;
    },
    clearCacheTags: [CACHE_ARTISANS],
  }
);
const { execute: executeUpdate, isFetching: isUpdating } = useMutation(
  UpdateArtisanDocument,
  {
    onData() {
      navigateTo('/artisans');
    },
    onError(err) {
      errorMessage.value =
        (err.graphqlErrors?.[0]?.extensions?.['originalError'] as string) ??
        err.message;
    },
    clearCacheTags: [CACHE_ARTISANS, CACHE_ARTISAN],
  }
);
const { execute: executeDelete } = useMutation(DeleteArtisanDocument, {
  clearCacheTags: [CACHE_ARTISANS],
  onData() {
    navigateTo('/artisans');
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
