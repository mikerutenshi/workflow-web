<template>
  <form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row>
      <v-col>
        <v-row v-if="error">
          <v-col>
            <v-alert type="error">
              {{ extractGraphQlError(error) }}
            </v-alert>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-card>
              <v-card-text>
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
              </v-card-text>
            </v-card>
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
      <ActionConfirm :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
    </v-row>
  </form>

  <ActionShowSnackbarSuccess
    v-model="snackbar"
    @close-dialog="emit('close-dialog')"
  ></ActionShowSnackbarSuccess>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
import { LaborCostSchema } from '~/validation/schema';
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

const props = defineProps({
  productGroupId: {
    type: String,
  },
});
const emit = defineEmits(['close-dialog']);
const snackbar = ref(false);

const route = useRoute();
const productGroupId = (route.params.id as string) || props.productGroupId;
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
  },
  onError: (error) => {
    alert(`Get Product Group Error -> ${error}`);
  },
  tags: [CACHE_PRODUCT_GROUP],
});

const { t } = useI18n();

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
    snackbar.value = true;
    // router.back();
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

watchEffect(() => {
  console.log(`Labor Form : ${JSON.stringify(values)}`);
});

function findCost(type: Job, array: any[]): number {
  return array.find((find) => find?.type === type);
}
</script>
