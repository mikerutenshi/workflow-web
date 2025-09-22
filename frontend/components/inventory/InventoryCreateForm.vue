<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <!-- <v-row>
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
      </v-col>
    </v-row> -->

    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('label.name')"
              class="mt-4"
              :error-messages="name.errorMessage.value"
              v-model="city.value.value"
            />
          </v-col>
        </v-row>

        <v-row align="start">
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
      </v-col>
    </v-row>

    <v-row align="end" class="ma-1 mt-4">
      <!-- <ActionCancel v-if="!workId"></ActionCancel> -->
      <ActionConfirm>{{ submitBtnTitle }}</ActionConfirm>
      <ActionDelete
        v-if="props.inventoryId"
        @click="deleteInventory(props.inventoryId)"
      ></ActionDelete>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { Cities } from '#imports';
import { useMutation } from 'villus';
import { DeleteInventoryDocument } from '~/api/generated/types';
import { InventorySchema } from '~/validation/schema';

const props = defineProps<{
  inventoryId?: string | null;
}>();

const validateInventorySchema = toTypedSchema(InventorySchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema: validateInventorySchema,
});
const name = useField('name');
const city = useField('city');

const { t } = useI18n();
const submitBtnTitle = computed(() =>
  props.inventoryId ? t('btn.update') : t('btn.create'),
);
watch(city.value, (newVal) => {
  console.log('City value changed:', newVal);
});

const onSubmit = () => {
  // Handle form submission
};

const deleteInventory = (id: string) => {
  const { execute } = useMutation(DeleteInventoryDocument, {
    clearCacheTags: [CACHE_INVENTORIES],
    onData(data) {
      if (data.deleteInventory)
        alert(`Inventory deleted successfully. ${data.deleteInventory}`);
      else alert('Failed to delete inventory');
    },
    onError(err) {
      alert(`An error occurred while deleting the inventory: ${err.message}`);
    },
  });

  execute({ id });
};
</script>
