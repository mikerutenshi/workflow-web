<template>
  <v-form @submit.prevent="onSubmit">
    <v-card-text>
      <v-row v-if="updateError || createError || deleteError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(updateError || createError || deleteError) }}
          </v-alert>
        </v-col>
      </v-row>

      <v-text-field
        :label="$t('label.name')"
        :error-messages="name.errorMessage.value"
        v-model="name.value.value"
      />

      <v-text-field
        :label="$t('label.address')"
        :error-messages="address.errorMessage.value"
        v-model="address.value.value"
      />

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

      <v-select
        v-model="type.value.value"
        :items="invTypes"
        :return-object="false"
        :label="$t('label.select_inv_type')"
        chips
        item-title="title"
        item-value="id"
        :error-messages="type.errorMessage.value"
      ></v-select>

      <v-card class="mb-4" variant="outlined">
        <v-card-title>
          {{ $t('label.store_price_formula') }}
        </v-card-title>
        <v-card-subtitle>
          {{ $t('label.price_formula_equation') }}
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col>
              <v-text-field
                :label="$t('label.price_offset')"
                v-maska:offsetUnmasked.unmasked="priceOffsetMask"
                v-model="priceFormulaModel.offset"
                inputmode="number"
                :error-messages="offset.errorMessage.value"
              />
              <v-text-field
                :label="$t('label.price_multiplier')"
                v-maska:multiplierUnmasked.unmasked="multiplierMask"
                v-model="priceFormulaModel.multiplier"
                inputmode="numeric"
                :error-messages="multiplier.errorMessage.value"
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="9">
              <v-text-field
                v-for="(_, index) in priceFormulaModel.discounts"
                :label="`${$t('label.discount')} ${index + 1}`"
                v-maska="percentageMask"
                :key="index"
                clearable
                :model-value="priceFormulaModel.discounts[index]"
                @update:model-value="
                  (value) =>
                    (priceFormulaModel.discounts[index] =
                      discMask.unmasked(value))
                "
                @click:clear="
                  if (discounts.fields.value.length > 1)
                    priceFormulaModel.discounts.pop();
                "
                inputmode="numeric"
                :error-messages="errors['priceFormula.discounts']"
              />
            </v-col>
            <v-col cols="3">
              <v-btn
                :icon="mdiPlus"
                color="primary"
                @click="priceFormulaModel.discounts.push('')"
              ></v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionDelete v-if="invId" @click="deleteInventory(invId)"></ActionDelete>
      <ActionConfirm :loading="isCreating || isUpdating">{{
        submitBtnTitle
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
import { Cities, percentageMask, Provinces } from '#imports';
import { mdiPlus } from '@mdi/js';
import { Mask } from 'maska';
import { useMutation, useQuery } from 'villus';
import {
  CreateInventoryDocument,
  DeleteInventoryDocument,
  GetInventoryDocument,
  InvType,
  UpdateInventoryDocument,
} from '~/api/generated/types';
import { InventorySchema } from '~/validation/schema';

const { t } = useI18n();
const invTypes = Object.entries(InvType).map(([key, value]) => ({
  id: value,
  title: t(renderInvType(value)),
}));

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
const type = useField('type');
const multiplier = useField('priceFormula.multiplier');
const offset = useField('priceFormula.offset');
const discounts = useFieldArray('priceFormula.discounts');

const submitBtnTitle = computed(() =>
  invId ? t('btn.update') : t('btn.create'),
);

const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const priceFormulaModel = reactive({
  offset: '',
  multiplier: '',
  discounts: [''],
});
const offsetUnmasked = ref('');
const multiplierUnmasked = ref('');
defineExpose({ offsetUnmasked, multiplierUnmasked });

const discMask = new Mask(percentageMask);

if (invId) {
  useQuery({
    query: GetInventoryDocument,
    variables: { id: invId || '' },
    onData(data) {
      const getInventory = data.getInventory;
      if (getInventory) {
        setValues({
          name: getInventory.name,
          address: getInventory.address,
          city: getInventory.city,
          province: getInventory.province,
          type: getInventory.type,
        });

        if (getInventory.priceFormula) {
          priceFormulaModel.offset =
            getInventory.priceFormula.offset?.toString() ?? '';
          priceFormulaModel.multiplier =
            getInventory.priceFormula.multiplier ?? '';
          if (getInventory.priceFormula.discounts.length > 0) {
            priceFormulaModel.discounts =
              getInventory.priceFormula.discounts.map((item) =>
                convertDecimalToPercent(item),
              );
          }
        }
      }
    },
    tags: [CACHE_INVENTORY],
  });
}

const {
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateInventoryDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_INVENTORIES],
});
const {
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateInventoryDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_INVENTORIES, CACHE_INVENTORY, CACHE_INV_PRODUCTS],
});
const {
  execute: executeDelete,
  error: deleteError,
  isFetching: isDeleting,
} = useMutation(DeleteInventoryDocument, {
  clearCacheTags: [CACHE_INVENTORIES],
  onData(data) {
    if (data.deleteInventory) {
      snack.message = `${t('status.deleted')}`;
    } else {
      snack.color = SnackColor.Error;
      snack.message = `${t('status.failed')}`;
    }
    snack.isVisible = true;
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

watch(offsetUnmasked, (newValue) => {
  offset.setValue(Number(newValue));
});
watch(multiplierUnmasked, (newValue) => {
  multiplier.setValue(newValue);
});
watch(
  () => priceFormulaModel.discounts,
  (newDiscounts) => {
    const decimals = newDiscounts
      .filter((item) => item !== '')
      .map((item) => convertPercentToDecimal(item));
    setFieldValue('priceFormula.discounts', decimals);
  },
  { deep: true },
);
// watchEffect(() => {
//   console.log(`Values: ${JSON.stringify(values)}`);
//   console.log(`Model: ${JSON.stringify(priceFormulaModel)}`);
// });
</script>
