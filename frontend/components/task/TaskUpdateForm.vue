<template>
  <v-form @submit.prevent="onSubmit">
    <v-row>
      <v-col>
        <v-row v-if="error || errors">
          <v-col>
            <v-alert type="error">
              {{ extractGraphQlError(error) || errors }}
            </v-alert>
          </v-col>
        </v-row>

        <v-card>
          <v-card-title>{{ $t('card.fill_artisans') }}</v-card-title>
          <v-card-text>
            <v-data-table
              :headers="taskHeaders"
              :items="displayForm"
              hide-default-footer
              editable
            >
              <template v-slot:item.type="{ item }">
                {{ $t(renderJob(item.type)) }}
              </template>

              <template #item.doneAt="{ item }">
                <ActionPickDate
                  :label="$t('label.done_at')"
                  v-model="item.doneAt"
                  variant="outlined"
                ></ActionPickDate>
              </template>

              <template #item.artisan="{ item, index }">
                <Field :name="`${index}.artisanId`" v-slot="{ errorMessage }">
                  <v-select
                    :label="$t('label.artisan')"
                    auto-select-first
                    item-value="id"
                    item-title="firstName"
                    :items="
                      artisansData?.getArtisans.filter((artisan) => {
                        return artisan.jobs.includes(item.type);
                      })
                    "
                    :loading="isFetchingArtisans"
                    v-model="item.artisan"
                    clearable
                    return-object
                    :error-messages="errorMessage"
                    @blur="() => validateField(`${index}.artisanId`)"
                  >
                    <template #item="{ props, item }">
                      <v-list-item
                        v-bind="props"
                        :title="`${item.raw.firstName} ${
                          item.raw.lastName ?? ''
                        }`"
                      >
                        <template #subtitle>
                          {{
                            item.raw.jobs
                              .map((job) => $t(renderJob(job)))
                              .join(', ')
                          }}
                        </template>
                      </v-list-item>
                    </template>
                  </v-select>
                  <span class="error">{{ errors[`${index}.artisanId`] }}</span>
                </Field>
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row align="end" class="ma-1 mt-4">
      <ActionCancel></ActionCancel>
      <ActionConfirm :loading="isUpdating">{{ submitBtnTitle }}</ActionConfirm>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports';
import { TaskSchema } from '@shared/schema';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import {
  GetArtisansDocument,
  GetTasksDocument,
  Job,
  UpdateTasksDocument,
  type TaskUpdateDto,
} from '~/api/generated/types';

const route = useRoute();
const workId = ref(route.params.id as string);
const authStore = useAuthStore();
const userId = authStore.user?.id || '';

const { data: artisansData, isFetching: isFetchingArtisans } = useQuery({
  query: GetArtisansDocument,
  tags: [CACHE_ARTISANS],
});
const localePath = useLocalePath();
const {
  execute: executeUpdate,
  isFetching: isUpdating,
  error,
} = useMutation(UpdateTasksDocument, {
  clearCacheTags: [CACHE_WORKS, CACHE_TASKS],
  onData() {
    navigateTo(localePath('/works'));
  },
});

const displayForm = reactive([
  {
    id: '',
    type: '' as Job,
    artisan: null as {
      id: string;
      firstName: string;
      lastName: string | null | undefined;
      jobs: Job[];
      createdBy: string;
      updatedBy?: string | null | undefined;
    } | null,
    doneAt: '',
    updatedBy: '',
  },
]);
const form = computed<TaskUpdateDto[]>(() => {
  const result = displayForm.map((item) => ({
    id: item.id,
    artisanId: item.artisan?.id ?? null,
    doneAt: item.doneAt === '' ? null : item.doneAt,
    updatedBy: userId,
  }));

  console.log(
    'Computed `form` recalculated based on displayForm:',
    JSON.stringify(result)
  );
  return result;
});
const validationSchema = toTypedSchema(TaskSchema);
const { handleSubmit, values, setValues, errors, validateField } = useForm({
  validationSchema,
  initialValues: [{ id: '1', artisanId: '2', doneAt: '', updatedBy: '3' }],
});
const artisan = useField('artisan');
const onSubmit = handleSubmit((data) => {
  executeUpdate({ data });
});

const { t } = useI18n();

const submitBtnTitle = computed(() =>
  workId.value ? t('btn.update') : t('btn.create')
);

const taskHeaders = ref([
  { title: t('label.type'), key: 'type' },
  { title: t('label.artisan'), key: 'artisan' },
  { title: t('label.done_at'), key: 'doneAt' },
]);

if (workId.value) {
  useQuery({
    query: GetTasksDocument,
    variables: { workId: workId.value },
    tags: [CACHE_TASKS],
    onData(data) {
      const tasks = data.getTasks;
      displayForm.splice(
        0,
        displayForm.length,
        ...tasks.map((task) => ({
          id: task.id,
          type: task.type,
          artisan: task.artisan
            ? {
                id: task.artisan.id,
                firstName: task.artisan.firstName,
                lastName: task.artisan.lastName,
                jobs: task.artisan.jobs,
                createdBy: task.artisan.createdBy,
                updatedBy: task.artisan.updatedBy,
              }
            : null,
          doneAt: task.doneAt,
          updatedBy: userId,
        }))
      );
    },
  });
}

watch(
  () => displayForm,
  (newTasks) => {
    newTasks.forEach((task) => {
      if (task.artisan && !task.doneAt) {
        task.doneAt = dayjs().toISOString();
      } else if (!task.artisan && task.doneAt) {
        task.doneAt = '';
      }
    });
  },
  { deep: true }
);

watchEffect(() => {
  setValues(
    form.value.map((item) => ({
      id: item.id,
      doneAt: item.doneAt,
      updatedBy: item.updatedBy,
      artisanId: item.artisanId ?? '0',
    }))
  );
});

watchEffect(() => {
  console.log(`Tasks Table -> ${JSON.stringify(values)}`);
});
</script>
