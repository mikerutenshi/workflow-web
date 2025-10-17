<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row v-if="createError">
          <v-col>
            <v-alert type="error">
              {{ extractGraphQlError(createError) }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <ActionPickDate
              v-model="trfDate.value.value"
              :error-messages="trfDate.errorMessage.value"
            ></ActionPickDate>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-text-field
              label="Transfer No"
              :error-messages="trfNo.errorMessage.value"
              v-model="trfNo.value.value"
            />
          </v-col>
        </v-row>

        <v-row>
          <v-col class="col-5" cols="5.5">
            <v-autocomplete
              label="From Inventory"
              auto-select-first
              item-value="id"
              item-title="name"
              :items="inventories?.getInventories"
              :loading="isFetchingInventories"
              v-model="fromInvId.value.value"
              :error-messages="fromInvId.errorMessage.value"
            >
            </v-autocomplete>
          </v-col>
          <v-col class="d-flex align-center justify-center" cols="1">
            <v-icon :icon="mdiTransferRight"></v-icon>
          </v-col>
          <v-col cols="5.5">
            <v-autocomplete
              label="To Inventory"
              auto-select-first
              item-value="id"
              item-title="name"
              :items="inventories?.getInventories"
              :loading="isFetchingInventories"
              v-model="toInvId.value.value"
              :error-messages="toInvId.errorMessage.value"
            >
            </v-autocomplete>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-select
              label="Progress"
              :items="progressList"
              item-value="key"
              item-title="value"
              v-model="progress.value.value"
              :error-messages="progress.errorMessage.value"
            >
            </v-select>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="end" class="ma-1 mt-4">
      <ActionConfirm :loading="isCreating">{{ submitBtnTitle }}</ActionConfirm>
      <ActionDelete
        v-if="props.invTrfId"
        @click="deleteInvTrf(props.invTrfId)"
      ></ActionDelete>
    </v-row>
  </v-form>

  <ActionShowSnack
    v-model="snack.isVisible"
    :message="snack.message"
    :color="snack.color"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnack>
</template>

<script setup lang="ts">
import { mdiTransferRight } from '@mdi/js';
import { useMutation, useQuery } from 'villus';
import {
  CreateInvTrfDocument,
  GetInventoriesDocument,
  Progress,
} from '~/api/generated/types';
import { InvTrfSchema } from '~/validation/schema';

const { t } = useI18n();
const props = defineProps<{
  invTrfId?: string | null;
}>();
const emit = defineEmits(['close-dialog']);
const snackbar = ref(false);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const snackbarMsg = ref(t('status.saved'));
const submitBtnTitle = computed(() =>
  props.invTrfId ? t('btn.update') : t('btn.create'),
);
const trfNo = useField('trfNo');
const fromInvId = useField('fromInvId');
const toInvId = useField('toInvId');
const trfDate = useField<string>('trfDate');
const progress = useField('progress');

const progressList = [
  { key: Progress.Initiated, value: 'Initiated' },
  { key: Progress.InProgress, value: 'In Progress' },
  { key: Progress.Completed, value: 'Completed' },
  { key: Progress.Cancelled, value: 'Cancelled' },
];

const { data: inventories, isFetching: isFetchingInventories } = useQuery({
  query: GetInventoriesDocument,
  tags: [CACHE_INVENTORIES],
});
const {
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateInvTrfDocument, {
  onData(data) {
    const id = data.createInvTrf.id;
    console.log(`Created Id: ${id}`);
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_INVENTORIES],
});

const validateInvTrfSchema = toTypedSchema(InvTrfSchema);
const { handleSubmit } = useForm({ validationSchema: validateInvTrfSchema });

const onSubmit = handleSubmit((data) => {
  executeCreate({ data });
});
const deleteInvTrf = (id: string) => {
  //todo
};
</script>
