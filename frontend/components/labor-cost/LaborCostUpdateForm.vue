<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="4">
      <v-form @submit.prevent="handleSubmit" class="pa-4">
        <v-text-field
          v-model="header.skuNumeric"
          label="Product Group"
          disabled
        />
        <v-text-field
          v-model="header.productCategory"
          label="Product Category"
          disabled
        />
        <v-text-field v-model="header.gender" label="Gender" disabled />
        <v-text-field
          v-model="masked.drawingUpper"
          label="Drawing Upper"
          prefix="Rp"
          v-maska="options"
          @maska="onDrawUpperMask"
        />
        <v-text-field
          v-model="masked.drawingLining"
          label="Drawing Lining"
          prefix="Rp"
          v-maska="options"
          @maska="onDrawLiningMask"
        />
        <v-text-field
          v-model="masked.stitchingUpper"
          label="Stitching Upper"
          prefix="Rp"
          v-maska="options"
          @maska="onStitchUpperMask"
        />
        <v-text-field
          v-model="masked.stitchingOutsole"
          label="Stitching Outsole"
          prefix="Rp"
          v-maska="options"
          @maska="onStitchOutsoleMask"
        />
        <v-text-field
          v-model="masked.stitchingInsole"
          label="Stitching insole"
          prefix="Rp"
          v-maska="options"
          @maska="onStitchInsoleMask"
        />
        <v-text-field
          v-model="masked.lasting"
          label="Lasting"
          prefix="Rp"
          v-maska="options"
          @maska="onLastMask"
        />

        <NuxtLink to="/labor-costs">
          <v-btn color="secondary" class="mr-4">Discard</v-btn>
        </NuxtLink>
        <v-btn type="submit" color="primary">{{ submitBtnValue }}</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { type MaskaDetail, type MaskInputOptions } from 'maska';
import { useMutation, useQuery } from 'villus';
import { useRoute } from 'vue-router';
import {
  CreateLaborCostDocument,
  GetProductGroupDocument,
  UpdateLaborCostDocument,
} from '~/api/generated/types';

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

const masked = reactive({
  drawingUpper: '',
  drawingLining: '',
  stitchingUpper: '',
  stitchingOutsole: null as string | null,
  stitchingInsole: null as string | null,
  lasting: '',
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

      masked.drawingUpper =
        data.getProductGroup.laborCost.drawingUpper.toString();
      masked.drawingLining =
        data.getProductGroup.laborCost.drawingLining.toString();
      masked.stitchingUpper =
        data.getProductGroup.laborCost.stitchingUpper.toString();
      masked.stitchingOutsole =
        data.getProductGroup.laborCost.stitchingOutsole?.toString() ?? null;
      masked.stitchingInsole =
        data.getProductGroup.laborCost.stitchingInsole?.toString() ?? null;
      masked.lasting = data.getProductGroup.laborCost.lasting.toString();

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

const options: MaskInputOptions = {
  mask: '9.99#',
  tokens: {
    9: { pattern: /[0-9]/, repeated: true },
  },
  reversed: true,
  // onMaska: (detail: MaskaDetail) =>
  //   console.log(`Unmasked -> ${detail.unmasked}`),
};

const onDrawUpperMask = (event: CustomEvent<MaskaDetail>) => {
  if (event.detail.unmasked !== '') form.drawingUpper = +event.detail.unmasked;
};
const onDrawLiningMask = (event: CustomEvent<MaskaDetail>) => {
  if (event.detail.unmasked !== '') form.drawingLining = +event.detail.unmasked;
};
const onStitchUpperMask = (event: CustomEvent<MaskaDetail>) => {
  if (event.detail.unmasked !== '')
    form.stitchingUpper = +event.detail.unmasked;
};
const onStitchOutsoleMask = (event: CustomEvent<MaskaDetail>) => {
  if (event.detail.unmasked !== '')
    form.stitchingOutsole = +event.detail.unmasked;
};
const onStitchInsoleMask = (event: CustomEvent<MaskaDetail>) => {
  if (event.detail.unmasked !== '')
    form.stitchingInsole = +event.detail.unmasked;
};
const onLastMask = (event: CustomEvent<MaskaDetail>) => {
  if (event.detail.unmasked !== '') form.lasting = +event.detail.unmasked;
};

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
