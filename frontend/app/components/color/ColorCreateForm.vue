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
        <span
          :style="{ color: $vuetify.theme.themes.light.colors.error }"
          class="ma-4 text-caption"
        >
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

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnack>
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
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const emit = defineEmits(['close-dialog']);
const props = defineProps<{
  colorId?: string | null;
}>();
const colorId = props.colorId;
// const form = reactive({
//   name: '',
//   hexCode: '',
// });
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

const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreateColorDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_COLORS],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateColorDocument, {
  onData() {
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_COLORS, CACHE_COLOR],
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: deleteError,
} = useMutation(DeleteColorDocument, {
  clearCacheTags: [CACHE_COLORS],
  onData(data) {
    if (data.deleteColor) {
      snack.message = `${t('status.deleted')}`;
      snack.isVisible = true;
    } else {
      snack.color = SnackColor.Error;
      snack.message = `${t('status.failed')}`;
      snack.isVisible = true;
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
