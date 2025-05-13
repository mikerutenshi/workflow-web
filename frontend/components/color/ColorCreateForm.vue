<template>
  <v-form @submit.prevent="handleSubmit" class="h-100">
    <v-container class="h-100 d-flex flex-column">
      <v-row>
        <v-col>
          <v-alert v-if="createError" type="error">
            {{
              createError.graphqlErrors?.[0]?.extensions?.['originalError'] ??
              createError.message
            }}
          </v-alert>
          <v-alert v-if="updateError" type="error">
            {{
              updateError.graphqlErrors?.[0]?.extensions?.['originalError'] ??
              updateError.message
            }}
          </v-alert>

          <v-row>
            <v-col>
              <v-text-field v-model="form.name" :label="$t('label.name')" />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card>
                <v-card-title>
                  {{ $t('label.pick_color') }}
                </v-card-title>
                <v-card-text>
                  <v-color-picker
                    v-model="form.hexCode"
                    :modes="['hex']"
                    show-swatches
                    class="d-inline"
                  ></v-color-picker>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row class="flex-grow-1"></v-row>

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
          @click="executeDelete({ id: colorId })"
        ></ActionDelete>
      </v-row>
    </v-container>
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

const route = useRoute();
const router = useRouter();

const colorId = ref(route.params.id as string);
const form = reactive({
  name: '',
  hexCode: '',
});

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
const { execute: executeDelete } = useMutation(DeleteColorDocument, {
  clearCacheTags: [CACHE_COLORS],
  onData() {
    goPrevious();
  },
  onError(err) {
    alert(`Error while deleting color -> ${err}`);
  },
});

if (colorId.value) {
  useQuery({
    query: GetColorDocument,
    variables: { id: colorId.value },
    tags: [CACHE_COLOR],
    onData(colorData) {
      if (colorData.getColor) {
        form.name = colorData.getColor.name;
        form.hexCode = colorData.getColor.hexCode;
      }
    },
  });
}

const goPrevious = () => {
  router.go(-1);
};
const handleSubmit = () => {
  if (colorId.value) {
    executeUpdate({ id: colorId.value, data: form });
  } else {
    executeCreate({ data: form });
  }
};

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
