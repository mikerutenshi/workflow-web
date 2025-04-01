<template>
  <v-row justify="center" align="center">
    <v-col cols="12" md="4">
      <v-form class="pa-4">
        <v-text-field v-model="form.skuNumeric" label="Product Group" />
        <v-text-field v-model="form.productCategory" label="Product Category" />
        <v-text-field v-model="form.gender" label="Gender" />
        <v-text-field v-model="form.drawingUpper" label="Drawing Upper" />
        <v-text-field v-model="form.drawingLining" label="Drawing Lining" />
        <v-text-field v-model="form.stitchingUpper" label="Stitching Upper" />
        <v-text-field
          v-model="form.stitchingOutsole"
          label="Stitching Outsole"
        />
        <v-text-field v-model="form.stitchingInsole" label="Stitching insole" />
        <v-text-field v-model="form.lasting" label="Lasting" />

        <NuxtLink to="/labour-costs">
          <v-btn color="secondary" class="mr-4">Discard</v-btn>
        </NuxtLink>
        <v-btn type="submit" color="primary">Update</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { useQuery } from 'villus';
import { useRoute } from 'vue-router';
import { GetProductGroupDocument } from '~/api/generated/types';

const route = useRoute();
const productGroupId = route.params.id as string;
const form = reactive({
  skuNumeric: '',
  productCategory: '',
  gender: '',
  drawingUpper: 0,
  drawingLining: 0,
  stitchingUpper: 0,
  stitchingOutsole: null as number | null,
  stitchingInsole: null as number | null,
  lasting: 0,
  createdBy: '',
  updatedBy: null as string | null,
});

useQuery({
  query: GetProductGroupDocument,
  variables: { id: productGroupId },
  onData: (data) => {
    form.skuNumeric = data.getProductGroup.skuNumeric;
    form.productCategory = data.getProductGroup.productCategory.name;
    form.gender = data.getProductGroup.productCategory.gender;
    if (data.getProductGroup.labourCost) {
      form.drawingUpper = data.getProductGroup.labourCost.drawingUpper;
      form.drawingLining = data.getProductGroup.labourCost.drawingLining;
      form.stitchingUpper = data.getProductGroup.labourCost.stitchingUpper;
      form.stitchingOutsole =
        data.getProductGroup.labourCost.stitchingOutsole ?? null;
      form.stitchingInsole =
        data.getProductGroup.labourCost.stitchingInsole ?? null;
      form.lasting = data.getProductGroup.labourCost.lasting;
      form.createdBy = data.getProductGroup.labourCost.createdBy;
      form.updatedBy = data.getProductGroup.labourCost.updatedBy ?? null;
    }
  },
  onError: (error) => {
    alert(`Get Product Error -> ${error}`);
  },
});
</script>
