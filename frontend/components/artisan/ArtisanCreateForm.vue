<template>
  <v-row justify="center">
    <v-col cols="12" md="4">
      <v-form class="pa-4" @submit.prevent="execute({ data: form })">
        <v-alert v-if="error" type="error">
          {{
            error.graphqlErrors?.[0]?.extensions?.['originalError'] ??
            error.message
          }}
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

        <div class="mt-4">
          <NuxtLink to="/artisans">
            <v-btn color="secondary" class="mr-4">Discard</v-btn>
          </NuxtLink>
          <v-btn :loading="isFetching" type="submit" color="primary"
            >Create</v-btn
          >
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useMutation } from 'villus';
import { CreateArtisanDocument } from '~/api/generated/types';

const authStore = useAuthStore();
const userId = authStore.user?.id ?? '';
const jobOptions = ref([
  { id: 'UPPER_DRAWER', title: 'Upper Drawer' },
  { id: 'LINING_DRAWER', title: 'Lining Drawer' },
  { id: 'uPPER_STITCHER', title: 'Upper stitcher' },
  { id: 'OUTSOLE_STITCHER', title: 'Outsole Stitcher' },
  { id: 'INSOLE_STITCHER', title: 'Insole Stitcher' },
  { id: 'LASTER', title: 'Laster' },
]);

const form = reactive({
  firstName: '',
  lastName: undefined as string | undefined,
  jobs: [],
  createdBy: userId,
});
const { execute, error, isFetching } = useMutation(CreateArtisanDocument, {
  onData() {
    navigateTo('/artisans');
  },
  clearCacheTags: [CACHE_ARTISANS],
});
const onBlur = () => {
  form.lastName = form.lastName === '' ? undefined : form.lastName;
};

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
