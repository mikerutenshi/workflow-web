<template>
  <v-form class="h-100" @submit.prevent="handleSubmit">
    <v-container class="h-100 d-flex flex-column">
      <v-row>
        <v-col>
          <v-alert v-if="errorMessages" type="error">
            {{ errorMessages }}
          </v-alert>

          <v-row>
            <v-col>
              <v-date-input
                :label="$t('label.date')"
                v-model="form.date"
                variant="outlined"
              ></v-date-input>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                :label="$t('label.order_no')"
                v-model.number="form.orderNo"
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-autocomplete
                :label="$t('label.product')"
                auto-select-first
                item-value="id"
                item-title="sku"
                :items="productsData?.getProducts"
                :loading="isFetchingProducts"
                v-model="form.productId"
              >
              </v-autocomplete>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-select
                :label="$t('label.select_sizes')"
                multiple
                chips
                auto-select-first
                :items="computeSizeList"
                :loading="isFetchingSizes"
                item-title="eu"
                item-value="id"
                v-model="sizes"
                return-object
              >
                <!-- <template #item="{ props, item }">
            <v-list-item
              v-bind="props"
              :title="`${item.raw.eu} | ${item.raw.us} | ${item.raw.uk}`"
            ></v-list-item>
          </template> -->
              </v-select>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card>
                <v-card-title>{{ $t('card.fill_quantities') }}</v-card-title>
                <v-card-text>
                  <v-data-table
                    :headers="sizeHeaders"
                    :items="sizesTable"
                    editable
                    hide-default-footer
                  >
                    <template #item.quantity="{ item }">
                      <v-text-field
                        v-model.number="item.quantity"
                        :label="$t('label.quantity')"
                        type="number"
                      />
                    </template>
                  </v-data-table>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <v-row align="end" class="ma-1 mt-4">
        <ActionCancel></ActionCancel>
        <ActionConfirm>{{ submitBtnTitle }}</ActionConfirm>
        <ActionDelete
          v-if="workId"
          @click="executeDelete({ id: workId })"
        ></ActionDelete>
      </v-row>
    </v-container>
  </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '#imports';
import { useMutation, useQuery } from 'villus';
import { useRoute, useRouter } from 'vue-router';
import {
  CreateWorkDocument,
  DeleteWorkDocument,
  GetProductsDocument,
  GetSizesDocument,
  GetWorkDocument,
  UpdateWorkDocument,
  type Size,
  type SizeToWorkCreateDto,
} from '~/api/generated/types';

const route = useRoute();
const workId = ref(route.params.id as string);

const { data: productsData, isFetching: isFetchingProducts } = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});
const { data: sizesData, isFetching: isFetchingSizes } = useQuery({
  query: GetSizesDocument,
  tags: [CACHE_SIZES],
});

const computeSizeList = computed(() => {
  const product = productsData.value?.getProducts.find(
    (product) => product.id === form.productId
  );
  const gender = product?.productGroup.productCategory.gender;
  return gender
    ? sizesData.value?.getSizes.filter((size) => size.gender == gender)
    : sizesData.value?.getSizes;
});

const router = useRouter();
const submitBtnTitle = computed(() =>
  workId.value ? t('btn.update') : t('btn.create')
);
const { execute: executeCreate } = useMutation(CreateWorkDocument, {
  clearCacheTags: [CACHE_WORKS],
  onData() {
    router.back();
  },
  onError(err) {
    errorMessages.value += err;
  },
});
const { execute: executeUpdate } = useMutation(UpdateWorkDocument, {
  clearCacheTags: [CACHE_WORK, CACHE_WORKS],
  onData() {
    router.back();
  },
  onError(err) {
    errorMessages.value += err;
  },
});
const { execute: executeDelete } = useMutation(DeleteWorkDocument, {
  clearCacheTags: [CACHE_WORKS],
  onData(data) {
    router.back();
  },
  onError(err) {
    errorMessages.value += err;
  },
});

const authStore = useAuthStore();
const userId = authStore.user?.id || '';
const form = reactive({
  date: new Date(),
  orderNo: parseInt(new Date().toISOString().slice(0, 10).replace(/-/g, '')),
  productId: '',
  sizes: [] as SizeToWorkCreateDto[],
  createdBy: userId,
  updatedBy: undefined as string | undefined,
});
const sizes = ref<Size[]>([]);
const sizesTable = reactive<
  Array<{ id: string; title: string; quantity: number }>
>([]);
const { t } = useI18n();
const sizeHeaders = ref([
  { title: t('label.size'), key: 'title' },
  { title: t('label.quantity'), key: 'quantity' },
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
      form.date = new Date(work.date);
      form.orderNo = work.orderNo;
      form.productId = work.productId;
      sizes.value = work.sizes.map((item) => ({
        id: item.size.id,
        eu: item.size.eu,
        gender: item.size.gender,
        jp: item.size.jp,
        uk: item.size.uk,
        us: item.size.us,
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
