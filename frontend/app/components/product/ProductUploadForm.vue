<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="errorMsrps">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(errorMsrps) }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <span>Upload New Products</span>
          <v-file-input
            accept=".csv"
            v-model="fileUploadNew"
            :disabled="isMsrpUploadActive"
            :error-messages="errors['csvFile']"
          ></v-file-input>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <span>Upload Products' MSRP</span>
          <v-file-input
            accept=".csv"
            v-model="fileUploadMsrp"
            :disabled="isNewUploadActive"
            :error-messages="errors['csvFile']"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isFetchingMsrps">{{
        $t('btn.upload')
      }}</ActionConfirm>
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
import { UploadProductGroupMsrpsDocument } from '~/api/generated/types';
import { fileSchema } from '~/validation/schema';

const { t } = useI18n();
const {
  execute: uploadMsrps,
  isFetching: isFetchingMsrps,
  error: errorMsrps,
} = useMutation(UploadProductGroupMsrpsDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData() {
    snack.isVisible = true;
  },
});
const fileUploadMsrp = ref<File | null>(null);
const fileUploadNew = ref<File | null>(null);
const isMsrpUploadActive = computed(() => fileUploadMsrp.value != null);
const isNewUploadActive = computed(() => fileUploadNew.value != null);
const validationSchema = toTypedSchema(fileSchema);
const { handleSubmit, errors, setFieldValue, values, setFieldError } = useForm({
  validationSchema,
});

const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const emit = defineEmits(['close-dialog']);

const onSubmit = handleSubmit((data) => {
  if (data.csvFile) {
    uploadMsrps({ data: { csvFile: data.csvFile } });
  } else {
    setFieldError('csvFile', 'No File Provided');
  }
});

watch([fileUploadMsrp, fileUploadNew], ([msrpFile, newFile]) => {
  setFieldValue('csvFile', msrpFile ?? newFile ?? null);
});
</script>
