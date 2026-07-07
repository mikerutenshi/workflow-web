<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row
        v-if="errorNewProductGroups || errorNewProducts || errorUpdateMsrps"
      >
        <v-col>
          <v-alert type="error">
            {{
              extractGraphQlError(
                errorNewProductGroups || errorNewProducts || errorUpdateMsrps,
              )
            }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4>Create New Product Groups</h4>
          <p>Columns: skuNumeric, productCategoryId, createdBy</p>
          <v-file-input
            accept=".csv"
            :model-value="files[0]"
            @update:model-value="(val) => setFile(val, 0)"
            :disabled="isDisableds[0]"
            :error-messages="errors['csvFile']"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4>Create New Products</h4>
          <p>
            Columns: sku, productCategoryId, productGroupId, colorId1, colorId2,
            colorId3, colorId4, createdBy
          </p>
          <v-file-input
            accept=".csv"
            :model-value="files[1]"
            @update:model-value="(val) => setFile(val, 1)"
            :disabled="isDisableds[1]"
            :error-messages="errors['csvFile']"
          ></v-file-input>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4>Update Products' MSRP</h4>
          <p>Columns: id, msrp, updatedBy</p>
          <v-file-input
            accept=".csv"
            :model-value="files[2]"
            @update:model-value="(val) => setFile(val, 2)"
            :disabled="isDisableds[2]"
            :error-messages="errors['csvFile']"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm
        :loading="
          isFetchingNewProductGroups ||
          isFetchingNewProducts ||
          isFetchingUpdateMsrps
        "
        >{{ $t('btn.upload') }}</ActionConfirm
      >
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
import {
  UploadNewProductGroupsDocument,
  UploadNewProductsDocument,
  UploadProductGroupMsrpsDocument,
} from '~/api/generated/types';
import { fileSchema } from '~/validation/schema';

const { t } = useI18n();
const {
  execute: executeNewProductGroups,
  isFetching: isFetchingNewProductGroups,
  error: errorNewProductGroups,
} = useMutation(UploadNewProductGroupsDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData() {
    snack.isVisible = true;
  },
});

const {
  execute: executeNewProducts,
  isFetching: isFetchingNewProducts,
  error: errorNewProducts,
} = useMutation(UploadNewProductsDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData() {
    snack.isVisible = true;
  },
});

const {
  execute: executeUpdateMsrps,
  isFetching: isFetchingUpdateMsrps,
  error: errorUpdateMsrps,
} = useMutation(UploadProductGroupMsrpsDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData() {
    snack.isVisible = true;
  },
});
const files = ref<Array<File | null>>([null, null, null]);
const isDisableds = ref([false, false, false]);
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

const onSubmit = handleSubmit(async (data) => {
  const fileIndex = files.value.findIndex((file) => file !== null);
  console.log(`fileIndex ${fileIndex}`);

  if (fileIndex === -1) {
    setFieldError('csvFile', 'No File Provided');
    return;
  }

  const payload = { data: { csvFile: data.csvFile } };

  switch (fileIndex) {
    case 0:
      await executeNewProductGroups(payload);
      break;
    case 1:
      await executeNewProducts(payload);
      break;
    case 2:
      await executeUpdateMsrps(payload);
      break;
    default:
      setFieldError('csvFile', 'No File Provided');
  }
});

function setFile(value: File | File[] | null, index: number) {
  const file = Array.isArray(value) ? (value[0] ?? null) : value;

  files.value = files.value.map((_, i) => (i === index ? file : null));

  if (file) {
    console.log(`name: ${file.name}`);
    isDisableds.value = isDisableds.value.map((_, i) => i !== index);
    setFieldValue('csvFile', file);
  } else {
    isDisableds.value = [false, false, false];
    setFieldValue('csvFile', null);
  }
}
</script>
