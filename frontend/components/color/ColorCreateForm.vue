<template>
  <v-row justify="center">
    <v-col cols="12" md="4" class="translucent-background">
      <v-form class="pa-4" @submit.prevent="execute({ data: form })">
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
          <v-btn color="secondary" class="mr-4" @click.stop="goPrevious"
            >Discard</v-btn
          >
          <v-btn :loading="isFetching" type="submit" color="primary"
            >Create</v-btn
          >
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>
<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import { CreateColorDocument } from '~/api/generated/types';
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();

const colorId = ref(route.params.id as string);
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
const goPrevious = () => {
  router.go(-1);
};

if (colorId.value) {
  // todo
}
watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
