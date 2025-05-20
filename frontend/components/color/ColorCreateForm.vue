<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row v-if="createError || updateError">
          <v-col>
            <v-alert type="error">
              {{ extractGraphQlError(createError || updateError) }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              v-model="name.value.value"
              :error-messages="name.errorMessage.value"
              :label="$t('label.name')"
            />
          </v-col>
        </v-row>

        <v-row class="flex-grow-1">
          <v-col class="flex-grow-1">
            <v-card elevation="0">
              <v-card-title>
                {{ $t('label.pick_color') }}
              </v-card-title>
              <v-card-subtitle
                v-if="hexCode.errorMessage.value"
                class="text-error"
              >
                {{ hexCode.errorMessage.value }}
              </v-card-subtitle>

              <v-card-text>
                <v-color-picker
                  swatches-max-height="300px"
                  v-model="hexCode.value.value"
                  v-model:mode="mode"
                  show-swatches
                ></v-color-picker>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- <v-row class="flex-grow-1"></v-row> -->

    <v-row align="end" class="ma-1">
      <ActionCancel></ActionCancel>
      <ActionConfirm v-if="colorId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
      <ActionDelete
        v-if="colorId"
        :loading="isDeleting"
        @click="executeDelete({ id: colorId })"
      ></ActionDelete>
    </v-row>
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
import { useRouter } from 'vue-router';
import { useRoute } from 'vue-router';
import { ColorSchema } from '@shared/schema';

const route = useRoute();
const router = useRouter();

const colorId = ref(route.params.id as string);
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
  'hex'
);

const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreateColorDocument, {
  onData() {
    goPrevious();
  },
  clearCacheTags: [CACHE_COLORS],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateColorDocument, {
  onData() {
    goPrevious();
  },
  clearCacheTags: [CACHE_COLORS, CACHE_COLOR],
});
const { execute: executeDelete, isFetching: isDeleting } = useMutation(
  DeleteColorDocument,
  {
    clearCacheTags: [CACHE_COLORS],
    onData() {
      goPrevious();
    },
    onError(err) {
      alert(`Error while deleting color -> ${err}`);
    },
  }
);

if (colorId.value) {
  useQuery({
    query: GetColorDocument,
    variables: { id: colorId.value },
    tags: [CACHE_COLOR],
    onData(colorData) {
      const color = colorData.getColor;
      if (color) {
        setValues({
          name: color.name,
          hexCode: color.hexCode,
        });
      }
    },
  });
}

const goPrevious = () => {
  router.go(-1);
};
const onSubmit = handleSubmit((data) => {
  if (colorId.value) {
    executeUpdate({ id: colorId.value, data });
  } else {
    executeCreate({ data });
  }
});

watchEffect(() => {
  console.log(JSON.stringify(values));
});
</script>
