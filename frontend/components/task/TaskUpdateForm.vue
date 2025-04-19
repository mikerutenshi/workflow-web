<template>
  <v-row justify="center" align="center">
    <v-col md="4">
      <v-form class="pa-4" @submit.prevent="handleSubmit">
        <v-alert v-if="errorMessages" type="error">
          {{ errorMessages }}
        </v-alert>

        <v-card>
          <v-card-title>Fill in Artisans</v-card-title>
          <v-data-table
            :headers="taskHeaders"
            :items="tasksForm"
            hide-default-footer
            editable
          >
            <template v-slot:item.type="{ item }">
              {{ renderJob(item.type) }}
            </template>

            <template #item.doneAt="{ item }">
              <v-date-input
                label="Done At"
                v-model="item.doneAt"
                variant="outlined"
              ></v-date-input>
            </template>

            <template #item.artisan="{ item }">
              <v-autocomplete
                label="Artisan"
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
              >
                <template #item="{ props, item }">
                  <v-list-item
                    v-bind="props"
                    :title="`${item.raw.firstName} ${item.raw.lastName}`"
                    :subtitle="renderJobs(item.raw.jobs)"
                  ></v-list-item>
                </template>
              </v-autocomplete>
            </template>
          </v-data-table>
        </v-card>

        <div class="d-flex mt-4">
          <NuxtLink to="/works">
            <v-btn color="secondary" class="mr-4">Discard</v-btn>
          </NuxtLink>
          <v-btn v-if="workId" type="submit" color="primary">Update</v-btn>
          <v-btn v-else type="submit" color="primary">Create</v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useQuery } from 'villus';
import {
  GetArtisansDocument,
  GetWorkDocument,
  Job,
} from '~/api/generated/types';
import { useAuthStore } from '#imports';

const route = useRoute();
const workId = ref(route.params.id as string);
const authStore = useAuthStore();
const userId = authStore.user?.id || '';

const { data: artisansData, isFetching: isFetchingArtisans } = useQuery({
  query: GetArtisansDocument,
  tags: [CACHE_ARTISANS],
});
const tasksForm = reactive([
  {
    workId: '',
    type: '' as Job,
    artisan: null as {
      id: string;
      firstName: string;
      lastName: string | null | undefined;
      jobs: Job[];
    } | null,
    doneAt: null as Date | null,
    createdBy: '',
    updatedBy: '',
  },
]);

const taskHeaders = ref([
  { title: 'Task', key: 'type' },
  { title: 'Artisan', key: 'artisan' },
  { title: 'Done At', key: 'doneAt' },
]);

const errorMessages = ref('');
const handleSubmit = () => {
  // executeUpdate({ id: workId.value, data: { ...form, updatedBy: userId } });
};

if (workId.value) {
  useQuery({
    query: GetWorkDocument,
    variables: { id: workId.value },
    tags: [CACHE_WORK],
    onData(data) {
      const work = data.getWork;
      tasksForm.splice(
        0,
        tasksForm.length,
        ...work.tasks.map((task) => ({
          workId: workId.value,
          type: task.type,
          artisan: task.artisan
            ? {
                id: task.artisan.id,
                firstName: task.artisan.firstName,
                lastName: task.artisan.lastName,
                jobs: task.artisan.jobs,
              }
            : null,
          doneAt: task.doneAt ? new Date(task.doneAt) : null,
          createdBy: task.createdBy,
          updatedBy: userId,
        }))
      );
    },
  });
}

watch(
  () => tasksForm,
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
  console.log(`Tasks Table -> ${JSON.stringify(tasksForm)}`);
});
</script>
