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
          label="Drawing Upper"
          prefix="Rp"
          :model-value="mask.masked(form.drawingUpper)"
          @update:model-value="
            (val) => (form.drawingUpper = +mask.unmasked(val))
          "
        />
        <v-text-field
          label="Drawing Lining"
          prefix="Rp"
          :model-value="mask.masked(form.drawingLining)"
          @update:model-value="
            (val) => (form.drawingLining = +mask.unmasked(val))
          "
        />
        <v-text-field
          label="Stitching Upper"
          prefix="Rp"
          :model-value="mask.masked(form.stitchingUpper)"
          @update:model-value="
            (val) => (form.stitchingUpper = +mask.unmasked(val))
          "
        />
        <v-text-field
          label="Stitching Outsole"
          prefix="Rp"
          :model-value="
            form.stitchingOutsole === 0 || form.stitchingOutsole === null
              ? ''
              : mask.masked(form.stitchingOutsole)
          "
          @update:model-value="
            (val) =>
              val === ''
                ? (form.stitchingOutsole = null)
                : (form.stitchingOutsole = +mask.unmasked(val))
          "
        />
        <v-text-field
          label="Stitching insole"
          prefix="Rp"
          :model-value="
            form.stitchingInsole === 0 || form.stitchingInsole === null
              ? ''
              : mask.masked(form.stitchingInsole)
          "
          @update:model-value="
            (val) =>
              val === ''
                ? (form.stitchingInsole = null)
                : (form.stitchingInsole = +mask.unmasked(val))
          "
        />
        <v-text-field
          label="Lasting"
          prefix="Rp"
          :model-value="mask.masked(form.lasting)"
          @update:model-value="(val) => (form.lasting = +mask.unmasked(val))"
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
import {
  Mask,
  MaskInput,
  type MaskaDetail,
  type MaskInputOptions,
} from 'maska';
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
  onMaska: (detail: MaskaDetail) => {
    console.log(`Completed -> ${detail.unmasked}`);
  },
};

const mask = new Mask(options);

watchEffect(() => {
  console.log(JSON.stringify(form));
});
</script>
