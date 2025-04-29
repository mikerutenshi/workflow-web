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
          label="Draw Upper"
          prefix="Rp"
          :model-value="mask.masked(costs.drawUpper)"
          @update:model-value="
            (val) => {
              costs.drawUpper = val;
            }
          "
        />
        <v-text-field
          label="Draw Lining"
          prefix="Rp"
          :model-value="mask.masked(costs.drawLining)"
          @update:model-value="
            (val) => {
              costs.drawLining = val;
            }
          "
        />
        <v-text-field
          label="Stitch Upper"
          prefix="Rp"
          :model-value="mask.masked(costs.stitchUpper)"
          @update:model-value="
            (val) => {
              costs.stitchUpper = val;
            }
          "
        />
        <v-text-field
          label="Last"
          prefix="Rp"
          :model-value="mask.masked(costs.last)"
          @update:model-value="
            (val) => {
              costs.last = val;
            }
          "
        />
        <v-text-field
          label="Stitch Outsole"
          prefix="Rp"
          :model-value="mask.masked(costs.stitchOutsole)"
          @update:model-value="
            (val) => {
              costs.stitchOutsole = val;
            }
          "
        />
        <v-text-field
          label="Stitch Insole"
          prefix="Rp"
          :model-value="mask.masked(costs.stitchInsole)"
          @update:model-value="
            (val) => {
              costs.stitchInsole = val;
            }
          "
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
  GetProductGroupDocument,
  Job,
  UpsertLaborCostsDocument,
  type LaborCostUpsertDto,
} from '~/api/generated/types';

const route = useRoute();
const productGroupId = route.params.id as string;
const authStore = useAuthStore();
const userId = authStore.user?.id ?? '';

const header = reactive({
  skuNumeric: '',
  productCategory: '',
  gender: '',
});
const form = reactive([] as LaborCostUpsertDto[]);
const costs = reactive({
  drawUpper: '',
  drawLining: '',
  stitchUpper: '',
  stitchOutsole: '',
  stitchInsole: '',
  last: '',
});

const submitBtnValue = computed(() => {
  return form.values.length > 0 ? 'Update' : 'Create';
});

useQuery({
  query: GetProductGroupDocument,
  variables: { id: productGroupId },
  onData: (data) => {
    header.skuNumeric = data.getProductGroup.skuNumeric;
    header.productCategory = data.getProductGroup.productCategory.name;
    header.gender = data.getProductGroup.productCategory.gender;

    const laborCosts = data.getProductGroup.laborCosts ?? [];

    if (laborCosts.length > 0) {
      form.splice(
        0,
        form.length,
        ...laborCosts.map((laborCost) => ({
          type: laborCost?.type as Job,
          cost: laborCost?.cost ?? 0,
          productGroupId: productGroupId,
          createdBy: laborCost?.createdBy ?? '',
          updatedBy: laborCost?.updatedBy ?? '',
        }))
      );
    }
  },
  onError: (error) => {
    alert(`Get Product Group Error -> ${error}`);
  },
  tags: [CACHE_PRODUCT_GROUP],
});

const handleSubmit = async () => {
  await execute({ data: form });
};

const { execute } = useMutation(UpsertLaborCostsDocument, {
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

watch(costs, (newCosts) => {
  let newDrawUpper = parseRupiah(newCosts.drawUpper);
  let newDrawLining = parseRupiah(newCosts.drawLining);
  let newStitchUpper = parseRupiah(newCosts.stitchUpper);
  let newStitchOutsole = parseRupiah(newCosts.stitchOutsole);
  let newStitchInsole = parseRupiah(newCosts.stitchInsole);
  let newLast = parseRupiah(newCosts.last);

  updateFormCost(newDrawUpper, Job.DrawUpper);
  updateFormCost(newDrawLining, Job.DrawLining);
  updateFormCost(newStitchUpper, Job.StitchUpper);
  updateFormCost(newStitchOutsole, Job.StitchOutsole);
  updateFormCost(newStitchInsole, Job.StitchInsole);
  updateFormCost(newLast, Job.Last);
});
watchEffect(() => {
  console.log(JSON.stringify(form));
});

function updateFormCost(cost: number, type: Job) {
  let foundItem = form.find((item) => item.type === type);
  if (cost > 0 && !Number.isNaN(cost)) {
    if (foundItem) {
      foundItem.cost = cost;
    } else {
      const object = {
        type,
        cost,
        productGroupId: productGroupId,
        createdBy: userId,
        updatedBy: userId,
      };
      form.push(object);
    }
  } else if (foundItem) {
    form.splice(form.indexOf(foundItem), 1);
  }
}
</script>
