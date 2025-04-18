<template>
  <v-row justify="center" align="center">
    <v-col md="4">
      <v-form class="pa-4" @submit.prevent="handleSubmit">
        <v-alert v-if="errorMessages" type="error">
          {{ errorMessages }}
        </v-alert>

        <!-- <v-menu
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template #activator="{ props }">
            <v-text-field
              label="Date"
              readonly
              v-bind="props"
              v-model="form.date"
              prepend-inner-icon="mdi-calendar"
            ></v-text-field>
          </template>

          <v-date-picker v-model="date" @input="menu = false"></v-date-picker>
        </v-menu> -->
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

        <!-- <v-row>
          <v-col cols="9" md="10"> -->
        <v-data-table
          :headers="headers"
          :items="sizesTable"
          class="elevation-1"
          editable
          hide-default-footer
        >
          <!-- <template #item.id="{ item }">
                <v-text-field v-model="item.title" label="Size" />
              </template> -->
          <template #item.quantity="{ item }">
            <v-text-field
              v-model.number="item.quantity"
              label="Quantity"
              type="number"
            />
          </template>
          <!-- <template #no-data>
            <v-btn @click="addRow">Add Row</v-btn>
          </template> -->
        </v-data-table>
        <!-- </v-col> -->
        <!-- <v-col cols="3" md="2" class="d-flex align-end justify-end">
            <v-btn icon="mdi-plus" color="primary" @click="addRow"></v-btn>
          </v-col>
        </v-row> -->

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
  GetProductsDocument,
  GetSizesDocument,
  GetWorkDocument,
  UpdateWorkDocument,
  type Size,
  type SizeToWorkDto,
} from '~/api/generated/types';

const route = useRoute();
const workId = ref(route.params.id as string);
const date = ref(new Date());
const dateInIso = computed(() => {
  return date.value ? new Date(date.value).toISOString() : '';
});

const {
  data: productsData,
  isFetching: isFetchingProducts,
  error: productsError,
} = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});
const {
  data: sizesData,
  isFetching: isFetchingSizes,
  error: sizesError,
} = useQuery({
  query: GetSizesDocument,
  tags: [CACHE_SIZES],
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
const sizes = ref<Size[]>([]);
const sizesTable = reactive<
  Array<{ id: string; title: string; quantity: number }>
>([]);

const headers = ref([
  { title: 'Size', key: 'title' },
  { title: 'Quantity', key: 'quantity' },
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
    },
  });
}

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
});
</script>
