<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="error">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(error) }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4>Create New Inventory Products</h4>
          <p>
            Columns: invId, productId, qty38, qty39, qty40, qty41, qty42, qty43,
            qty44, qty45
          </p>
          <v-file-input
            accept=".csv"
            :model-value="values.csvFile"
            @update:model-value="setFile"
            :error-messages="errors['csvFile']"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isFetching">{{ $t('btn.upload') }}</ActionConfirm>
    </v-card-actions>
  </v-form>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @on-confirm="emit('close-dialog')"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { useMutation } from 'villus';
import { UploadNewInvProductsDocument } from '~/api/generated/types';
import { fileSchema } from '~/validation/schema';

const { t } = useI18n();
const emit = defineEmits(['close-dialog']);

const {
  execute: executeUpload,
  isFetching,
  error,
} = useMutation(UploadNewInvProductsDocument, {
  refetchTags: [CACHE_INV_PRODUCTS],
  onData() {
    snack.isVisible = true;
  },
});

const validationSchema = toTypedSchema(fileSchema);
const { handleSubmit, errors, setFieldValue, values, setFieldError } = useForm({
  validationSchema,
});

const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});

const onSubmit = handleSubmit((data) => {
  if (!data.csvFile) {
    setFieldError('csvFile', 'No File Provided');
    return;
  }

  executeUpload({ data: { csvFile: data.csvFile } });
});

function setFile(value: File | File[] | null) {
  const file = Array.isArray(value) ? (value[0] ?? null) : value;
  setFieldValue('csvFile', file);
}
</script>
