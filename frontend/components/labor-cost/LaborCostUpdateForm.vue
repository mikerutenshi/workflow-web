<template>
  <v-form @submit.prevent="handleSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-text-field
              v-model="header.skuNumeric"
              :label="$t('label.product_group')"
              readonly
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="header.productCategory"
              :label="$t('label.product_category')"
              readonly
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="computeGender"
              :label="$t('label.gender')"
              readonly
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.draw_upper')"
              prefix="Rp"
              :model-value="mask.masked(costs.drawUpper)"
              @update:model-value="
                (val) => {
                  costs.drawUpper = val;
                }
              "
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.draw_lining')"
              prefix="Rp"
              :model-value="mask.masked(costs.drawLining)"
              @update:model-value="
                (val) => {
                  costs.drawLining = val;
                }
              "
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.stitch_upper')"
              prefix="Rp"
              :model-value="mask.masked(costs.stitchUpper)"
              @update:model-value="
                (val) => {
                  costs.stitchUpper = val;
                }
              "
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.stitch_outsole')"
              prefix="Rp"
              :model-value="mask.masked(costs.stitchOutsole)"
              @update:model-value="
                (val) => {
                  costs.stitchOutsole = val;
                }
              "
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.stitch_insole')"
              prefix="Rp"
              :model-value="mask.masked(costs.stitchInsole)"
              @update:model-value="
                (val) => {
                  costs.stitchInsole = val;
                }
              "
              type="number"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.last')"
              prefix="Rp"
              :model-value="mask.masked(costs.last)"
              @update:model-value="
                (val) => {
                  costs.last = val;
                }
              "
              type="number"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="end" class="ma-1">
      <ActionCancel></ActionCancel>
      <ActionConfirm :loading="isUpdating">{{ submitBtnTitle }}</ActionConfirm>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { Mask, type MaskaDetail, type MaskInputOptions } from 'maska';
import { useMutation, useQuery } from 'villus';
import { useRoute, useRouter } from 'vue-router';
import {
  Gender,
  GetProductGroupDocument,
  Job,
  UpsertLaborCostsDocument,
  type LaborCostUpsertDto,
} from '~/api/generated/types';
import { parseGender } from '~/utils/functions';

const route = useRoute();
const productGroupId = route.params.id as string;
const authStore = useAuthStore();
const userId = authStore.user?.id ?? '';

const header = reactive({
  skuNumeric: '',
  productCategory: '',
  gender: 'KIDS' as Gender,
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
const computeGender = computed({
  get() {
    return t(renderGender(header.gender));
  },
  set(val) {
    header.gender = parseGender(val);
  },
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
      updateCosts('drawUpper', Job.DrawUpper, laborCosts);
      updateCosts('drawLining', Job.DrawLining, laborCosts);
      updateCosts('stitchUpper', Job.StitchUpper, laborCosts);
      updateCosts('last', Job.Last, laborCosts);
      updateCosts('stitchOutsole', Job.StitchOutsole, laborCosts);
      updateCosts('stitchInsole', Job.StitchInsole, laborCosts);
    }
  },
  onError: (error) => {
    alert(`Get Product Group Error -> ${error}`);
  },
  tags: [CACHE_PRODUCT_GROUP],
});

const { t } = useI18n();
const submitBtnTitle = computed(() => {
  return form.length > 0 ? t('btn.update') : t('btn.create');
});

const handleSubmit = async () => {
  await execute({ productGroupId, data: form });
};

const router = useRouter();
const { execute, isFetching: isUpdating } = useMutation(
  UpsertLaborCostsDocument,
  {
    clearCacheTags: [
      CACHE_PRODUCT_GROUPS,
      CACHE_PRODUCT_GROUP,
      CACHE_TASKS,
      CACHE_WORKS,
      CACHE_PAYROLL,
    ],
    onData() {
      router.back();
    },
    onError(err) {
      alert(err);
    },
  }
);

const options: MaskInputOptions = {
  mask: '9.99#',
  tokens: {
    9: { pattern: /[0-9]/, repeated: true },
  },
  reversed: true,
  onMaska: (detail: MaskaDetail) => {},
};

const mask = new Mask(options);

watch(costs, (newCosts) => {
  let newDrawUpper = parseRupiah(newCosts.drawUpper);
  let newDrawLining = parseRupiah(newCosts.drawLining);
  let newStitchUpper = parseRupiah(newCosts.stitchUpper);
  let newStitchOutsole = parseRupiah(newCosts.stitchOutsole);
  let newStitchInsole = parseRupiah(newCosts.stitchInsole);
  let newLast = parseRupiah(newCosts.last);

  updateForm(newDrawUpper, Job.DrawUpper);
  updateForm(newDrawLining, Job.DrawLining);
  updateForm(newStitchUpper, Job.StitchUpper);
  updateForm(newStitchOutsole, Job.StitchOutsole);
  updateForm(newStitchInsole, Job.StitchInsole);
  updateForm(newLast, Job.Last);
});
watchEffect(() => {
  console.log(`Labor Form : ${JSON.stringify(form)}`);
});

function updateForm(cost: number, type: Job) {
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

function updateCosts(field: keyof typeof costs, type: Job, array: any[]) {
  let found = array.find((find) => find?.type === type);
  if (found) costs[field] = found.cost.toString();
}
</script>
