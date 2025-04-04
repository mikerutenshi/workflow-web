<template>
  <v-row justify="center">
    <v-col cols="12" md="4" class="translucent-background">
      <v-form class="pt-4" @submit.prevent="execute({ data: form })">
        <v-alert v-if="error" type="error">
          {{
            error.graphqlErrors?.[0]?.extensions?.['originalError'] ??
            error.message
          }}
        </v-alert>
        <v-text-field v-model="form.name" label="Name" />
        <v-sheet elevation="1">
          <span class="d-flex text-h6 pa-4 justify-center">Pick a Color</span>
          <v-color-picker
            v-model="form.hexCode"
            :modes="['hex']"
            show-swatches
            class="d-inline"
          ></v-color-picker>
        </v-sheet>

        <div class="mt-4">
          <NuxtLink to="/colors">
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
import { CreateColorDocument } from '~/api/generated/types';

const form = reactive({
  name: '',
  hexCode: '',
});
const { execute, error, isFetching } = useMutation(CreateColorDocument, {
  onData() {
    navigateTo('/colors');
  },
});
const handleSubmit = () => {
  // todo
};

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
