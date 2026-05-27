<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <span>Upload Products Msrp</span>
      <v-file-input accept=".csv" v-model="file"></v-file-input>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isFetching">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { useMutation } from 'villus';
import { UploadProductGroupMsrpsDocument } from '~/api/generated/types';

const { execute, isFetching } = useMutation(UploadProductGroupMsrpsDocument, {
  onData() {
    console.log('Success');
  },
  onError(err) {
    console.log(err);
  },
  context: {
    headers: {
      'apollo-require-preflight': 'true',
    },
  },
});
const file = ref<File | null>(null);

const onSubmit = () => execute({ data: { csvFile: file.value } });
</script>
