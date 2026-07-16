<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="errorNewInvProducts || errorUpdateDiscounts">
        <v-col>
          <v-alert type="error">
            {{
              extractGraphQlError(errorNewInvProducts || errorUpdateDiscounts)
            }}
          </v-alert>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <h4>Create New Inventory Products</h4>
          <p>
            Columns: invId, productId, qty38, qty39, qty40, qty41, qty42, qty43,
            qty44, qty45, discounts
          </p>
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
          <h4>Update Inventory Product Discounts</h4>
          <p>Columns: invId, productId, discounts</p>
          <v-file-input
            accept=".csv"
            :model-value="files[1]"
            @update:model-value="(val) => setFile(val, 1)"
            :disabled="isDisableds[1]"
            :error-messages="errors['csvFile']"
          ></v-file-input>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm
        :loading="isFetchingNewInvProducts || isFetchingUpdateDiscounts"
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
  UploadInvProductDiscountsDocument,
  UploadNewInvProductsDocument,
} from '~/api/generated/types';
import { fileSchema } from '~/validation/schema';

const { t } = useI18n();
const emit = defineEmits(['close-dialog']);

const {
  execute: executeNewInvProducts,
  isFetching: isFetchingNewInvProducts,
  error: errorNewInvProducts,
} = useMutation(UploadNewInvProductsDocument, {
  refetchTags: [CACHE_INV_PRODUCTS],
  onData() {
    snack.isVisible = true;
  },
});

const {
  execute: executeUpdateDiscounts,
  isFetching: isFetchingUpdateDiscounts,
  error: errorUpdateDiscounts,
} = useMutation(UploadInvProductDiscountsDocument, {
  refetchTags: [CACHE_INV_PRODUCTS],
  onData() {
    snack.isVisible = true;
  },
});

const files = ref<Array<File | null>>([null, null]);
const isDisableds = ref([false, false]);
const validationSchema = toTypedSchema(fileSchema);
const { handleSubmit, errors, setFieldValue, setFieldError } = useForm({
  validationSchema,
});

const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});

const onSubmit = handleSubmit((data) => {
  const fileIndex = files.value.findIndex((file) => file !== null);

  if (fileIndex === -1) {
    setFieldError('csvFile', 'No File Provided');
    return;
  }

  const payload = { data: { csvFile: data.csvFile } };

  switch (fileIndex) {
    case 0:
      executeNewInvProducts(payload);
      break;
    case 1:
      executeUpdateDiscounts(payload);
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
    isDisableds.value = [false, false];
    setFieldValue('csvFile', null);
  }
}
</script>
