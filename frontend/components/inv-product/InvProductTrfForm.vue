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

        <v-row v-if="fromInvId.value.value && toInvId.value.value">
          <v-col class="d-flex flex-column">
            <span :style="{ color: errorColor }">
              {{ errors['invTrfItemIds'] }}
            </span>
            <v-data-table
              :headers="headers"
              :items="fetchData?.getInvTrfItems"
              :search="search"
              :loading="isFetchingInvTrfs"
              item-value="id"
              v-model="itemIdSelections"
              hover
              :page="pageNo"
              :items-per-page="itemsPerPage"
              show-select
            >
              <template #loading>
                <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
              </template>

              <template v-slot:item.invTrfItemSizes="{ item }">
                <v-table density="compact">
                  <tbody>
                    <tr v-for="i in item.invTrfItemSizes" :key="i.size.id">
                      <td>{{ i.size.eu }}</td>
                      <td>{{ i.quantity }}</td>
                    </tr>
                    <tr>
                      <td><i>Total</i></td>
                      <td>
                        <i>
                          {{
                            item.invTrfItemSizes.reduce(
                              (sum, size) => sum + size.quantity,
                              0,
                            )
                          }}
                        </i>
                      </td>
                    </tr>
                  </tbody>
                </v-table>
              </template>
            </v-data-table>
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
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useTheme } from 'vuetify';
import type { VDataTable } from 'vuetify/components';
import {
  CreateInvTrfDocument,
  GetInventoriesDocument,
  GetInvTrfItemsDocument,
  GetInvTrfItemTrfsDocument,
  GetLastInvTrfNoDocument,
  Progress,
} from '~/api/generated/types';
import { InvTrfSchema } from '~/validation/schema';

const errorColor = useTheme().themes.value.light.colors.error;
const { t } = useI18n();
const props = defineProps<{
  invTrfId?: string | null;
}>();

const emit = defineEmits(['close-dialog']);
const snack = reactive({
  isVisible: false,
  message: t('status.saved'),
  color: SnackColor.Success,
});
const submitBtnTitle = computed(() =>
  props.invTrfId ? t('btn.update') : t('btn.create'),
);

const authStore = useAuthStore();
const userId = authStore.user?.id || '';

const validationSchema = toTypedSchema(InvTrfSchema);
const { handleSubmit, values, errors } = useForm({
  validationSchema,
  initialValues: {
    trfDate: dayjs().toISOString(),
    progress: Progress.Initiated,
    createdBy: userId,
  },
});
const trfNo = useField('trfNo');
const fromInvId = useField('fromInvId');
const toInvId = useField('toInvId');
const trfDate = useField<string>('trfDate');
const progress = useField('progress');
const { fields, push, remove, replace } = useFieldArray('invTrfItemIds');

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
const { isFetching: isFetchingTrfNo } = useQuery({
  query: GetLastInvTrfNoDocument,
  cachePolicy: 'network-only',
  onData(data) {
    trfNo.setValue(generateId(Operation.Transfer, data.getLastInvTrfNo));
  },
});
const {
  isFetching: isCreating,
  execute: executeCreate,
  error: createError,
} = useMutation(CreateInvTrfDocument, {
  onData(data) {
    const id = data.createInvTrf.id;
    console.log(`Created Id: ${id}`);
    snack.message = t('status.saved');
    snack.isVisible = true;
  },
  clearCacheTags: [CACHE_INV_TRFS],
});
const variables = reactive({
  fromInvId: '',
  toInvId: '',
});
const {
  execute: executeFetch,
  data: fetchData,
  isFetching: isFetchingInvTrfs,
  error: invTrfsError,
} = useQuery({
  variables,
  query: GetInvTrfItemsDocument,
  tags: [CACHE_INV_TRFS],
  fetchOnMount: false,
});

type ReadOnlyHeaders = VDataTable['$props']['headers'];
const headers: ReadOnlyHeaders = [
  { title: t('label.sku'), key: 'product.sku' },
  { title: t('label.from_inv'), key: 'fromInv.name' },
  { title: t('label.to_inv'), key: 'toInv.name' },
  { title: t('label.status'), key: 'progress' },
  { title: t('label.sizes'), key: 'invTrfItemSizes', minWidth: '120' },
];
const pageNo = ref(1);
const itemsPerPage = ref(10);
const search = ref('');

const itemIdSelections = ref<string[]>([]);

const onSubmit = handleSubmit((data) => {
  console.log(`data: ${JSON.stringify(data)}`);
  executeCreate({ data });
});
const deleteInvTrf = (id: string) => {
  //todo
};

watch(itemIdSelections, (newValues) => {
  console.log(`item id selections: ${JSON.stringify(newValues)}`);
  replace(newValues);
});

watchEffect(() => {
  if (fromInvId.value.value && toInvId.value.value) {
    console.log('Triggered');
    variables.fromInvId = fromInvId.value.value as string;
    variables.toInvId = toInvId.value.value as string;
  }
  console.log(`form values: ${JSON.stringify(values)}`);
});
</script>
