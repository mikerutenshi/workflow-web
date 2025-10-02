<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row v-if="updateError || createError || deleteError">
          <v-col>
            <v-alert type="error">
              {{
                extractGraphQlError(updateError || createError || deleteError)
              }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              :label="$t('label.name')"
              :error-messages="name.errorMessage.value"
              v-model="name.value.value"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              :label="$t('label.address')"
              :error-messages="address.errorMessage.value"
              v-model="address.value.value"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete
              :label="$t('label.select_city')"
              auto-select-first
              item-value="title"
              item-title="title"
              :items="Cities"
              v-model="city.value.value"
              :error-messages="city.errorMessage.value"
              :allow-new="true"
            >
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-autocomplete
              :label="$t('label.select_province')"
              auto-select-first
              item-value="title"
              item-title="title"
              :items="Provinces"
              v-model="province.value.value"
              :error-messages="province.errorMessage.value"
              :allow-new="true"
            >
            </v-autocomplete>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="end" class="ma-1 mt-4">
      <ActionConfirm :loading="isCreating || isUpdating">{{
        submitBtnTitle
      }}</ActionConfirm>
      <ActionDelete v-if="invId" @click="deleteInventory(invId)"></ActionDelete>
    </v-row>
  </v-form>

  <ActionShowSnackbarSuccess
    v-model="snackbar"
    :message="snackbarMsg"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnackbarSuccess>
</template>

<script setup lang="ts">
import { Cities } from '#imports';
import { Provinces } from '#imports';
import { useMutation, useQuery } from 'villus';
import {
  CreateInventoryDocument,
  DeleteInventoryDocument,
  GetInventoryDocument,
  UpdateInventoryDocument,
} from '~/api/generated/types';
import { InventorySchema } from '~/validation/schema';

const { t } = useI18n();
const localePath = useLocalePath();

const props = defineProps<{
  invId?: string | null;
}>();
const invId = props.invId;

const validateInventorySchema = toTypedSchema(InventorySchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema: validateInventorySchema,
});
const name = useField('name');
const address = useField('address');
const city = useField('city');
const province = useField('province');

const submitBtnTitle = computed(() =>
  invId ? t('btn.update') : t('btn.create'),
);

const emit = defineEmits(['close-dialog']);
const snackbar = ref(false);
const snackbarMsg = ref(t('status.saved'));

if (invId) {
  useQuery({
    query: GetInventoryDocument,
    variables: { id: invId || '' },
    onData(data) {
      if (data && data.getInventory) {
        setValues({
          name: data.getInventory.name,
          address: data.getInventory.address,
          city: data.getInventory.city,
          province: data.getInventory.province,
        });
      }
    },
  });
}

const {
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateInventoryDocument, {
  onData() {
    snackbar.value = true;
  },
  clearCacheTags: [CACHE_INVENTORIES],
});
const {
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateInventoryDocument, {
  onData() {
    snackbar.value = true;
  },
  clearCacheTags: [CACHE_INVENTORIES],
});
const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteInventoryDocument, {
  clearCacheTags: [CACHE_INVENTORIES],
  onData(data) {
    if (data.deleteInventory) {
      snackbarMsg.value = `${t('status.deleted')}`;
      snackbar.value = true;
    } else alert('Failed to delete inventory');
  },
  onError(err) {
    alert(`An error occurred while deleting the inventory: ${err.message}`);
  },
});

const onSubmit = handleSubmit((data) => {
  if (invId) {
    executeUpdate({ id: invId, data });
  } else {
    executeCreate({ data });
  }
});

const deleteInventory = (id: string) => {
  executeDelete({ id });
};
</script>
