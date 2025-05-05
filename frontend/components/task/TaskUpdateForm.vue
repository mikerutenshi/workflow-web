<template>
  <v-row justify="center" align="center">
    <v-col>
      <v-form
        class="pa-4"
        @submit.prevent="
          executeUpdate({
            data: form,
          })
        "
      >
        <v-alert v-if="errorMessages" type="error">
          {{ errorMessages }}
        </v-alert>

        <v-card>
          <v-card-title>{{ $t('card.fill_artisans') }}</v-card-title>
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
              <v-date-input
                :label="$t('label.done_at')"
                v-model="item.doneAt"
                variant="outlined"
              ></v-date-input>
            </template>

            <template #item.artisan="{ item }">
              <v-autocomplete
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
              >
                <template #item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="`${item.raw.firstName} ${item.raw.lastName}`"
                    :subtitle="$t(renderJobs(item.raw.jobs))"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </template>
          </v-data-table>
        </v-card>

        <div class="d-flex mt-4">
          <NuxtLink :to="$localePath('works')">
            <v-btn color="secondary" class="mr-4">{{ $t('btn.cancel') }}</v-btn>
          </NuxtLink>
          <v-btn v-if="workId" type="submit" color="primary">{{
            $t('btn.update')
          }}</v-btn>
          <v-btn v-else type="submit" color="primary">{{
            $t('btn.create')
          }}</v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports';
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
const { execute: executeUpdate } = useMutation(UpdateTasksDocument, {
  clearCacheTags: [CACHE_WORKS, CACHE_TASKS],
  onData() {
    navigateTo(localePath('/works'));
  },
  onError(err) {
    errorMessages.value += err;
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
    doneAt: null as Date | null,
    updatedBy: '',
  },
]);

const form = computed<TaskUpdateDto[]>(() => {
  const result = displayForm.map((item) => ({
    id: item.id,
    artisanId: item.artisan?.id ?? null,
    doneAt: item.doneAt,
    updatedBy: userId,
  }));

  console.log(
    'Computed `form` recalculated based on displayForm:',
    JSON.stringify(result)
  );
  return result;
});

const { t } = useI18n();
const taskHeaders = ref([
  { title: t('label.type'), key: 'type' },
  { title: t('label.artisan'), key: 'artisan' },
  { title: t('label.done_at'), key: 'doneAt' },
]);

const errorMessages = ref('');

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
          doneAt: task.doneAt ? new Date(task.doneAt) : null,
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
        task.doneAt = new Date();
      } else if (!task.artisan && task.doneAt) {
        task.doneAt = null;
      }
    });
  },
  { deep: true }
);

watchEffect(() => {
  console.log(`Tasks Table -> ${JSON.stringify(displayForm)}`);
});
</script>
