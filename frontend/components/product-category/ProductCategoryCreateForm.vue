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
        <v-autocomplete
          v-model="form.gender"
          label="Gender"
          auto-select-first
          item-value="id"
          item-title="name"
          :items="genders"
        />

        <div class="mt-4">
          <NuxtLink to="/product-categories">
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
import { CreatePrdouctCategoryDocument } from '~/api/generated/types';

const form = reactive({
  name: '',
  gender: '',
});
const genders = ref(['MEN', 'WOMEN', 'KIDS']);
const { execute, error, isFetching } = useMutation(
  CreatePrdouctCategoryDocument,
  {
    onData() {
      navigateTo('/product-categories');
    },
    clearCacheTags: [CACHE_PRODUCT_CATEGORIES],
  }
);
const handleSubmit = () => {
  // todo
};

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
