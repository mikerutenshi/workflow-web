<template>
  <v-row v-if="updateError" class="flex-grow-0">
    <v-col>
      <v-alert type="error">
        {{ extractGraphQlError(updateError) }}
      </v-alert>
    </v-col>
  </v-row>

  <v-form @submit.prevent="onSubmit">
    <v-card-text>
      <v-row>
        <v-col cols="9">
          <v-text-field
            v-for="(_, index) in discsDisplay"
            :label="`${$t('label.discount')} ${index + 1}`"
            v-maska="percentageMask"
            :key="index"
            clearable
            :model-value="discsDisplay[index]"
            @update:model-value="
              (value) => (discsDisplay[index] = discMask.unmasked(value))
            "
            @click:clear="
              if (discounts.fields.value.length > 1) discsDisplay.pop();
            "
            inputmode="numeric"
            :error-messages="errors['discounts']"
          />
        </v-col>
        <v-col cols="3">
          <v-btn
            :icon="mdiPlus"
            color="primary"
            @click="discsDisplay.push('')"
          ></v-btn>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isUpdating">{{ t('btn.update') }}</ActionConfirm>
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
import { mdiPlus } from '@mdi/js';
import {
  UpdateInvProductDiscDocument,
  type InvProductDto,
} from '~/api/generated/types';
import { useMutation } from 'villus';
import { percentageMask } from '#imports';
import { InvProductUpdateDiscSchema } from '~/validation/schema';
import { Mask } from 'maska';

const { t } = useI18n();
const props = defineProps({
  invProductDto: {
    type: Object as PropType<InvProductDto | null>,
    required: true,
  },
});
const emit = defineEmits(['close-dialog']);

const validateDiscountSchema = toTypedSchema(InvProductUpdateDiscSchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema: validateDiscountSchema,
});

const discsDisplay = ref(['']);

if (props.invProductDto) {
  let dto = props.invProductDto;

  if (dto.discounts.length > 0) {
    discsDisplay.value = dto.discounts.map((disc) =>
      convertDecimalToPercent(disc),
    );
  }

  setFieldValue('invId', dto.invId);
  setFieldValue('productId', dto.productId);
}
const discounts = useFieldArray('discounts');
const discMask = new Mask(percentageMask);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});

const {
  isFetching: isUpdating,
  execute: executeUpdate,
  error: updateError,
} = useMutation(UpdateInvProductDiscDocument, {
  onData(data) {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_INV_PRODUCTS],
});

const onSubmit = handleSubmit((data) => {
  executeUpdate({ data });
});

watch(discsDisplay.value, (newArray) => {
  const decimals = newArray
    .filter((item) => item !== '')
    .map((item) => convertPercentToDecimal(item));
  setFieldValue('discounts', decimals);
});
</script>
