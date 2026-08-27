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
          <p>Columns: skuNumeric, productCategoryId</p>
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
            Columns: sku, productGroupId, colorId1, colorId2, colorId3, colorId4
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
          <p>Columns: id, msrp</p>
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
const snack = useSnackbarStore();
const {
  execute: executeNewProductGroups,
  isFetching: isFetchingNewProductGroups,
  error: errorNewProductGroups,
} = useMutation(UploadNewProductGroupsDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
});

const {
  execute: executeNewProducts,
  isFetching: isFetchingNewProducts,
  error: errorNewProducts,
} = useMutation(UploadNewProductsDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
});

const {
  execute: executeUpdateMsrps,
  isFetching: isFetchingUpdateMsrps,
  error: errorUpdateMsrps,
} = useMutation(UploadProductGroupMsrpsDocument, {
  refetchTags: [CACHE_PRODUCTS],
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
});
const files = ref<Array<File | null>>([null, null, null]);
const isDisableds = ref([false, false, false]);
const validationSchema = toTypedSchema(fileSchema);
const { handleSubmit, errors, setFieldValue, values, setFieldError } = useForm({
  validationSchema,
});

const emit = defineEmits(['form-submit']);

const onSubmit = handleSubmit(async (data) => {
  const fileIndex = files.value.findIndex((file) => file !== null);

  if (fileIndex === -1) {
    setFieldError('csvFile', 'No File Provided');
    return;
  }

  const payload = { data: { csvFile: data.csvFile } };

  switch (fileIndex) {
    case 0:
      executeNewProductGroups(payload);
      break;
    case 1:
      executeNewProducts(payload);
      break;
    case 2:
      executeUpdateMsrps(payload);
      break;
    default:
      setFieldError('csvFile', 'No File Provided');
  }
});

function setFile(value: File | File[] | null, index: number) {
  const file = Array.isArray(value) ? (value[0] ?? null) : value;

  files.value = files.value.map((_, i) => (i === index ? file : null));

  if (file) {
    isDisableds.value = isDisableds.value.map((_, i) => i !== index);
    setFieldValue('csvFile', file);
  } else {
    isDisableds.value = [false, false, false];
    setFieldValue('csvFile', null);
  }
}
</script>
