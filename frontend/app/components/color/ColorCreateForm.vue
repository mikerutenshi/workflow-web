<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError || updateError || deleteError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(createError || updateError || deleteError) }}
          </v-alert>
        </v-col>
      </v-row>

      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        :label="$t('label.name')"
      />

      <v-card class="mb-4" variant="outlined">
        <v-card-title>
          {{ $t('label.pick_color') }}
        </v-card-title>

        <v-card-text>
          <v-color-picker
            swatches-max-height="300px"
            v-model="hexCode.value.value"
            v-model:mode="mode"
            show-swatches
          ></v-color-picker>
        </v-card-text>
        <span class="ma-4 text-caption text-error">
          {{ hexCode.errorMessage.value }}
        </span>
      </v-card>
    </v-card-text>

    <v-card-actions>
      <v-spacer> </v-spacer>
      <ActionDelete
        v-if="colorId"
        :loading="isDeleting"
        @click="executeDelete({ id: colorId })"
      ></ActionDelete>
      <ActionConfirm v-if="colorId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import {
  CreateColorDocument,
  DeleteColorDocument,
  GetColorDocument,
  UpdateColorDocument,
} from '~/api/generated/types';
import { ColorSchema } from '~/validation/schema';

const { t } = useI18n();
const emit = defineEmits(['form-submit']);
const props = defineProps<{
  colorId?: string | null;
}>();
const colorId = props.colorId;
const validationSchema = toTypedSchema(ColorSchema);
const { handleSubmit, values, setValues } = useForm({
  validationSchema,
  initialValues: {
    hexCode: '',
  },
});
const name = useField('name');
const hexCode = useField<string>('hexCode');
const mode = ref<'hex' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hexa' | undefined>(
  'hex',
);

const snack = useSnackbarStore();
const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreateColorDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_COLORS],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateColorDocument, {
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_COLORS, CACHE_COLOR],
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: deleteError,
} = useMutation(DeleteColorDocument, {
  refetchTags: [CACHE_COLORS],
  onData(data) {
    if (data.deleteColor) {
      emit('form-submit');
      snack.show(t('status.deleted'), SnackColor.Success);
    }
  },
});

if (colorId) {
  useQuery({
    query: GetColorDocument,
    variables: { id: colorId },
    tags: [CACHE_COLOR],
    onData(data) {
      const color = data.getColor;
      if (color) {
        setValues({
          name: color.name,
          hexCode: color.hexCode,
        });
      }
    },
  });
}

const onSubmit = handleSubmit((data) => {
  if (colorId) {
    executeUpdate({ id: colorId, data });
  } else {
    executeCreate({ data });
  }
});
</script>
