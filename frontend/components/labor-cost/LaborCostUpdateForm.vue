<template>
  <form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row>
          <v-col>
            <v-alert v-if="error" type="error">
              {{ extractGraphQlError(error) }}
            </v-alert>
          </v-col>
        </v-row>
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
            <v-divider></v-divider>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.draw_upper')"
              prefix="Rp"
              :model-value="mask.masked(drawUpper.value.value ?? '')"
              @update:model-value="
                (val) => {
                  drawUpper.setValue(parseRupiah(val));
                }
              "
              type="number"
              :error-messages="drawUpper.errorMessage.value"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.draw_lining')"
              prefix="Rp"
              :model-value="mask.masked(drawLining.value.value ?? '')"
              @update:model-value="
                (val) => {
                  drawLining.setValue(parseRupiah(val));
                }
              "
              type="number"
              :error-messages="drawLining.errorMessage.value"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.stitch_upper')"
              prefix="Rp"
              :model-value="mask.masked(stitchUpper.value.value ?? '')"
              @update:model-value="
                (val) => {
                  stitchUpper.setValue(parseRupiah(val));
                }
              "
              type="number"
              :error-messages="stitchUpper.errorMessage.value"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.stitch_outsole')"
              prefix="Rp"
              :model-value="mask.masked(stitchOutsole.value.value ?? '')"
              @update:model-value="
                (val) => {
                  stitchOutsole.setValue(parseRupiah(val));
                }
              "
              type="number"
              :error-messages="stitchOutsole.errorMessage.value"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.stitch_insole')"
              prefix="Rp"
              :model-value="mask.masked(stitchInsole.value.value ?? '')"
              @update:model-value="
                (val) => {
                  stitchInsole.setValue(parseRupiah(val));
                }
              "
              type="number"
              :error-messages="stitchInsole.errorMessage.value"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              :label="$t('jobs.last')"
              prefix="Rp"
              :model-value="mask.masked(last.value.value ?? '')"
              @update:model-value="
                (val) => {
                  last.setValue(parseRupiah(val));
                }
              "
              type="number"
              :error-messages="last.errorMessage.value"
            />
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row align="end" class="ma-1">
      <ActionCancel></ActionCancel>
      <ActionConfirm :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
    </v-row>
  </form>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { LaborCostSchema } from '@shared/schema';
import { Mask, type MaskaDetail, type MaskInputOptions } from 'maska';
import { useMutation, useQuery } from 'villus';
import { useRoute, useRouter } from 'vue-router';
import {
  Gender,
  GetLaborCostDocument,
  Job,
  UpdateLaborCostsDocument,
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
// const form = reactive([] as LaborCostUpsertDto[]);
const computeGender = computed({
  get() {
    return t(renderGender(header.gender));
  },
  set(val) {
    header.gender = parseGender(val);
  },
});

const validationSchema = toTypedSchema(LaborCostSchema);
const { handleSubmit, setValues, values } = useForm({
  validationSchema,
  initialValues: {
    productGroupId,
    updatedBy: userId,
  },
});
const drawUpper = useField<number | null>('drawUpper');
const drawLining = useField<number | null>('drawLining');
const stitchUpper = useField<number | null>('stitchUpper');
const stitchOutsole = useField<number | null>('stitchOutsole');
const stitchInsole = useField<number | null>('stitchInsole');
const last = useField<number | null>('last');

useQuery({
  query: GetLaborCostDocument,
  variables: { id: productGroupId },
  onData: (data) => {
    header.skuNumeric = data.getLaborCost.skuNumeric;
    header.productCategory = data.getLaborCost.productCategory.name;
    header.gender = data.getLaborCost.productCategory.gender;
    setValues({
      createdBy: data.getLaborCost.laborCosts?.[0]?.createdBy ?? userId,
    });

    const laborCosts = data.getLaborCost.laborCosts ?? [];
    // setValues(
    //   laborCosts
    //     .filter((item): item is NonNullable<typeof item> => item !== null)
    //     .map((item) => ({
    //       type: item.type as Job,
    //       cost: item.cost,
    //       productGroupId: productGroupId,
    //       createdBy: item.createdBy,
    //       updatedBy: item.updatedBy ?? userId,
    //     }))
    // );

    if (laborCosts.length > 0) {
      laborCosts.forEach((laborCost) => {
        switch (laborCost?.type) {
          case Job.DrawUpper:
            drawUpper.setValue(laborCost.cost);
            break;
          case Job.DrawLining:
            drawLining.setValue(laborCost.cost);
            break;
          case Job.StitchUpper:
            stitchUpper.setValue(laborCost.cost);
            break;
          case Job.StitchOutsole:
            stitchOutsole.setValue(laborCost.cost);
            break;
          case Job.StitchInsole:
            stitchInsole.setValue(laborCost.cost);
            break;
          case Job.Last:
            last.setValue(laborCost.cost);
            break;
          default:
            break;
        }
      });
    }
    // updateCosts('drawUpper', Job.DrawUpper, laborCosts);
    // updateCosts('drawLining', Job.DrawLining, laborCosts);
    // updateCosts('stitchUpper', Job.StitchUpper, laborCosts);
    // updateCosts('last', Job.Last, laborCosts);
    // updateCosts('stitchOutsole', Job.StitchOutsole, laborCosts);
    // updateCosts('stitchInsole', Job.StitchInsole, laborCosts);
  },
  onError: (error) => {
    alert(`Get Product Group Error -> ${error}`);
  },
  tags: [CACHE_PRODUCT_GROUP],
});

const { t } = useI18n();
// const submitBtnTitle = computed(() => {
//   return values.length > 0 ? t('btn.update') : t('btn.create');
// });

const onSubmit = handleSubmit((values) => {
  execute({ data: values });
});

const router = useRouter();
const {
  execute,
  isFetching: isUpdating,
  error,
} = useMutation(UpdateLaborCostsDocument, {
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
});

const options: MaskInputOptions = {
  mask: '9.99#',
  tokens: {
    9: { pattern: /[0-9]/, repeated: true },
  },
  reversed: true,
  onMaska: (detail: MaskaDetail) => {},
};

const mask = new Mask(options);

// watch(costs, (newCosts) => {
//   let newDrawUpper = parseRupiah(newCosts.drawUpper);
//   let newDrawLining = parseRupiah(newCosts.drawLining);
//   let newStitchUpper = parseRupiah(newCosts.stitchUpper);
//   let newStitchOutsole = parseRupiah(newCosts.stitchOutsole);
//   let newStitchInsole = parseRupiah(newCosts.stitchInsole);
//   let newLast = parseRupiah(newCosts.last);

//   updateForm(newDrawUpper, Job.DrawUpper);
//   updateForm(newDrawLining, Job.DrawLining);
//   updateForm(newStitchUpper, Job.StitchUpper);
//   updateForm(newStitchOutsole, Job.StitchOutsole);
//   updateForm(newStitchInsole, Job.StitchInsole);
//   updateForm(newLast, Job.Last);
// });
watchEffect(() => {
  console.log(`Labor Form : ${JSON.stringify(values)}`);
});

// function updateForm(cost: number, type: Job) {
//   let foundItem = form.find((item) => item.type === type);
//   if (cost > 0 && !Number.isNaN(cost)) {
//     if (foundItem) {
//       foundItem.cost = cost;
//     } else {
//       const object = {
//         type,
//         cost,
//         productGroupId: productGroupId,
//         createdBy: userId,
//         updatedBy: userId,
//       };
//       form.push(object);
//     }
//   } else if (foundItem) {
//     form.splice(form.indexOf(foundItem), 1);
//   }
// }

// function updateCosts(field: keyof typeof costs, type: Job, array: any[]) {
//   let found = array.find((find) => find?.type === type);
//   if (found) costs[field] = found.cost.toString();
// }
function findCost(type: Job, array: any[]): number {
  return array.find((find) => find?.type === type);
}
</script>
