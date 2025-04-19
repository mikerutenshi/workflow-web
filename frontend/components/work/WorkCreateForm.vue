<template>
  <v-row justify="center" align="center">
    <v-col md="4">
      <v-form class="pa-4" @submit.prevent="handleSubmit">
        <v-alert v-if="errorMessages" type="error">
          {{ errorMessages }}
        </v-alert>

        <v-date-input
          label="Date"
          v-model="date"
          variant="outlined"
        ></v-date-input>

        <v-text-field label="SPK" v-model.number="form.orderNo"></v-text-field>

        <v-autocomplete
          label="Product"
          auto-select-first
          item-value="id"
          item-title="sku"
          :items="productsData?.getProducts"
          :loading="isFetchingProducts"
          v-model="form.productId"
        >
        </v-autocomplete>

        <v-autocomplete
          label="Select Sizes"
          multiple
          chips
          auto-select-first
          :items="sizesData?.getSizes"
          :loading="isFetchingSizes"
          item-title="eu"
          item-value="id"
          v-model="sizes"
          return-object
        >
          <template #item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="`${item.raw.eu} | ${item.raw.us} | ${item.raw.uk}`"
            ></v-list-item>
          </template>
        </v-autocomplete>

        <v-card class="mb-4">
          <v-card-title>Fill in quantities</v-card-title>
          <v-data-table
            :headers="sizeHeaders"
            :items="sizesTable"
            class="elevation-1"
            editable
            hide-default-footer
          >
            <template #item.quantity="{ item }">
              <v-text-field
                v-model.number="item.quantity"
                label="Quantity"
                type="number"
              />
            </template>
          </v-data-table>
        </v-card>

        <v-card class="mt-4">
          <v-card-title>Fill in artisans</v-card-title>
          <v-data-table
            :headers="taskHeaders"
            :items="tasksTable"
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
          <v-btn
            v-if="workId"
            type="button"
            color="error"
            class="ml-auto"
            @click="executeDelete({ id: workId })"
          >
            Delete
          </v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports';
import { useMutation, useQuery } from 'villus';
import { useRoute } from 'vue-router';
import {
  CreateWorkDocument,
  DeleteWorkDocument,
  GetArtisansDocument,
  GetProductsDocument,
  GetSizesDocument,
  GetWorkDocument,
  Job,
  UpdateWorkDocument,
  type Artisan,
  type Size,
  type SizeToWorkDto,
} from '~/api/generated/types';

const route = useRoute();
const workId = ref(route.params.id as string);
const date = ref(new Date());
const dateInIso = computed(() => {
  return date.value ? new Date(date.value).toISOString() : '';
});

const { data: productsData, isFetching: isFetchingProducts } = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});
const { data: sizesData, isFetching: isFetchingSizes } = useQuery({
  query: GetSizesDocument,
  tags: [CACHE_SIZES],
});
const { data: artisansData, isFetching: isFetchingArtisans } = useQuery({
  query: GetArtisansDocument,
  tags: [CACHE_ARTISANS],
});
const { execute: executeCreate } = useMutation(CreateWorkDocument, {
  clearCacheTags: [CACHE_WORKS],
  onData() {
    navigateTo('/works');
  },
  onError(err) {
    errorMessages.value += err;
  },
});
const { execute: executeUpdate } = useMutation(UpdateWorkDocument, {
  clearCacheTags: [CACHE_WORK, CACHE_WORKS],
  onData() {
    navigateTo('/works');
  },
  onError(err) {
    errorMessages.value += err;
  },
});
const { execute: executeDelete } = useMutation(DeleteWorkDocument, {
  clearCacheTags: [CACHE_WORKS],
  onData() {
    navigateTo('/works');
  },
  onError(err) {
    errorMessages.value += err;
  },
});

const authStore = useAuthStore();
const userId = authStore.user?.id || '';
const form = reactive({
  date: '',
  orderNo: 0,
  productId: '',
  sizes: [] as SizeToWorkDto[],
  createdBy: userId,
  updatedBy: undefined as string | undefined,
});
const tasksForm = reactive([
  {
    workId: '',
    type: '' as Job,
    artisanId: '',
    doneAt: '',
    createdBy: '',
    updatedBy: '',
  },
]);
const sizes = ref<Size[]>([]);
const sizesTable = reactive<
  Array<{ id: string; title: string; quantity: number }>
>([]);
const tasksTable = reactive([
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

const sizeHeaders = ref([
  { title: 'Size', key: 'title' },
  { title: 'Quantity', key: 'quantity' },
]);
const taskHeaders = ref([
  { title: 'Task', key: 'type' },
  { title: 'Artisan', key: 'artisan' },
  { title: 'Done At', key: 'doneAt' },
]);

const errorMessages = ref('');
const handleSubmit = () => {
  if (!workId.value) {
    executeCreate({ data: form });
  } else {
    executeUpdate({ id: workId.value, data: { ...form, updatedBy: userId } });
  }
};

if (workId.value) {
  useQuery({
    query: GetWorkDocument,
    variables: { id: workId.value },
    tags: [CACHE_WORK],
    onData(data) {
      const work = data.getWork;
      date.value = new Date(work.date);
      form.orderNo = work.orderNo;
      form.productId = work.productId;
      sizes.value = work.sizes.map((item) => ({
        id: item.size.id,
        eu: item.size.eu,
      }));
      work.sizes.forEach((item) => {
        const sizeInTable = sizesTable.find((size) => size.id === item.size.id);
        if (sizeInTable) {
          sizeInTable.quantity = item.quantity;
        } else {
          sizesTable.push({
            id: item.size.id,
            title: item.size.eu,
            quantity: item.quantity,
          });
        }
      });
      tasksTable.splice(
        0,
        tasksTable.length,
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
  () => tasksTable,
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
  form.date = dateInIso.value;

  sizesTable.splice(
    0,
    sizesTable.length,
    ...sizes.value.map((size) => {
      const existing = sizesTable.find((item) => item.id === size.id);
      return {
        id: size.id,
        title: size.eu,
        quantity: existing ? existing.quantity : 0,
      };
    })
  );

  form.sizes = sizesTable.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  }));

  console.log(`Form -> ${JSON.stringify(form)}`);
  console.log(`Tasks Table -> ${JSON.stringify(tasksTable)}`);
});
</script>
