<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="4">
      <v-form @submit.prevent="handleSubmit" class="pa-4">
        <v-text-field v-model="header.skuNumeric" label="Product Group" />
        <v-text-field
          v-model="header.productCategory"
          label="Product Category"
        />
        <v-text-field v-model="header.gender" label="Gender" />
        <v-text-field v-model="form.drawingUpper" label="Drawing Upper" />
        <v-text-field v-model="form.drawingLining" label="Drawing Lining" />
        <v-text-field v-model="form.stitchingUpper" label="Stitching Upper" />
        <v-text-field
          v-model="form.stitchingOutsole"
          label="Stitching Outsole"
        />
        <v-text-field v-model="form.stitchingInsole" label="Stitching insole" />
        <v-text-field v-model="form.lasting" label="Lasting" />

        <NuxtLink to="/labor-costs">
          <v-btn color="secondary" class="mr-4">Discard</v-btn>
        </NuxtLink>
        <v-btn type="submit" color="primary">{{ submitBtnValue }}</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import { useRoute } from 'vue-router';
import {
  CreateLaborCostDocument,
  GetProductGroupDocument,
  UpdateLaborCostDocument,
} from '~/api/generated/types';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const productGroupId = route.params.id as string;
const laborCostId = ref('');
const submitBtnValue = computed(() => {
  return laborCostId.value ? 'Update' : 'Create';
});
const header = reactive({
  skuNumeric: '',
  productCategory: '',
  gender: '',
});
const form = reactive({
  drawingUpper: 0,
  drawingLining: 0,
  stitchingUpper: 0,
  stitchingOutsole: null as number | null,
  stitchingInsole: null as number | null,
  lasting: 0,
  productGroupId: '',
  createdBy: '',
  updatedBy: undefined as string | undefined,
});

useQuery({
  query: GetProductGroupDocument,
  variables: { id: productGroupId },
  onData: (data) => {
    header.skuNumeric = data.getProductGroup.skuNumeric;
    header.productCategory = data.getProductGroup.productCategory.name;
    header.gender = data.getProductGroup.productCategory.gender;
    form.productGroupId = data.getProductGroup.id;

    if (data.getProductGroup.laborCost) {
      laborCostId.value = data.getProductGroup.laborCost.id;
      form.drawingUpper = data.getProductGroup.laborCost.drawingUpper;
      form.drawingLining = data.getProductGroup.laborCost.drawingLining;
      form.stitchingUpper = data.getProductGroup.laborCost.stitchingUpper;
      form.stitchingOutsole =
        data.getProductGroup.laborCost.stitchingOutsole ?? null;
      form.stitchingInsole =
        data.getProductGroup.laborCost.stitchingInsole ?? null;
      form.lasting = data.getProductGroup.laborCost.lasting;
      form.createdBy = data.getProductGroup.laborCost.createdBy;
      form.updatedBy = data.getProductGroup.laborCost.updatedBy ?? undefined;
    }
  },
  onError: (error) => {
    alert(`Get Product Error -> ${error}`);
  },
  tags: [CACHE_PRODUCT_GROUP],
});

const handleSubmit = async () => {
  const authStore = useAuthStore();
  const userId = authStore.user?.id ?? '';
  convertNumber();

  if (laborCostId.value) {
    form.updatedBy = userId;
    console.log(`IsEditing -> ${laborCostId.value}`);
    console.log(`Update form -> ${JSON.stringify(form)}`);
    await executeUpdate({ id: laborCostId.value, data: form });
  } else {
    form.createdBy = userId;
    console.log(`Create form -> ${JSON.stringify(form)}`);
    await executeCreate({ data: form });
  }
};

const convertNumber = () => {
  form.drawingUpper = Number(form.drawingUpper);
  form.drawingLining = Number(form.drawingLining);
  form.stitchingUpper = Number(form.stitchingUpper);
  form.stitchingOutsole = form.stitchingOutsole
    ? Number(form.stitchingOutsole)
    : null;
  form.stitchingInsole = form.stitchingInsole
    ? Number(form.stitchingInsole)
    : null;
  form.lasting = Number(form.lasting);
};

const { execute: executeUpdate } = useMutation(UpdateLaborCostDocument, {
  clearCacheTags: [CACHE_PRODUCT_GROUPS, CACHE_PRODUCT_GROUP],
  onData() {
    navigateTo('/labor-costs');
  },
  onError(err) {
    alert(err);
  },
});

const { execute: executeCreate } = useMutation(CreateLaborCostDocument, {
  clearCacheTags: [CACHE_PRODUCT_GROUPS, CACHE_PRODUCT_GROUP],
  onData() {
    navigateTo('/labor-costs');
  },
  onError(err) {
    alert(err);
  },
});
</script>
