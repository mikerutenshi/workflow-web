<template>
  <form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-row v-if="error">
      <v-col>
        <v-alert type="error">
          {{ extractGraphQlError(error) }}
        </v-alert>
      </v-col>
    </v-row>

    <v-card-title>
      <v-text-field
        v-model="header.skuNumeric"
        :label="$t('label.product_group')"
        readonly
      />
      <v-text-field
        v-model="header.productCategory"
        :label="$t('label.product_category')"
        readonly
      />
      <v-text-field
        v-model="computeGender"
        :label="$t('label.gender')"
        readonly
      />
    </v-card-title>
    <v-divider thickness="4"></v-divider>
    <v-card-text>
      <v-text-field
        :label="$t('jobs.draw_upper')"
        v-maska:drawUpperUnmasked.unmasked="options"
        v-model="priceModel.drawUpper"
        inputmode="number"
        clearable
        :error-messages="drawUpper.errorMessage.value"
      />
      <v-text-field
        :label="$t('jobs.draw_lining')"
        v-maska:drawLiningUnmasked.unmasked="options"
        v-model="priceModel.drawLining"
        inputmode="number"
        clearable
        :error-messages="drawLining.errorMessage.value"
      />
      <v-text-field
        :label="$t('jobs.stitch_upper')"
        v-maska:stitchUpperUnmasked.unmasked="options"
        v-model="priceModel.stitchUpper"
        inputmode="number"
        clearable
        :error-messages="stitchUpper.errorMessage.value"
      />
      <v-text-field
        :label="$t('jobs.stitch_outsole')"
        v-maska:stitchOutsoleUnmasked.unmasked="options"
        v-model="priceModel.stitchOutsole"
        inputmode="number"
        clearable
        :error-messages="stitchOutsole.errorMessage.value"
      />
      <v-text-field
        :label="$t('jobs.stitch_insole')"
        v-maska:stitchInsoleUnmasked.unmasked="options"
        v-model="priceModel.stitchInsole"
        inputmode="number"
        clearable
        :error-messages="stitchInsole.errorMessage.value"
      />
      <v-text-field
        :label="$t('jobs.last')"
        v-maska:lastUnmasked.unmasked="options"
        v-model="priceModel.last"
        inputmode="number"
        clearable
        :error-messages="last.errorMessage.value"
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
    </v-card-actions>
  </form>

  <ActionShowSnack
    v-model="snackbar"
    :message="snackbarMsg"
    @on-confirm="emit('close-dialog')"
  ></ActionShowSnack>
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

const { t } = useI18n();
const props = defineProps({
  productGroupId: {
    type: String,
  },
});
const emit = defineEmits(['close-dialog']);
const snackbar = ref(false);
const snackbarMsg = ref(t('status.saved'));

const route = useRoute();
const productGroupId =
  (route.params.id as string) || props.productGroupId || '';
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

const priceModel = reactive({
  drawUpper: '',
  drawLining: '',
  stitchUpper: '',
  stitchOutsole: '',
  stitchInsole: '',
  last: '',
});
const drawUpperUnmasked = ref('');
const drawLiningUnmasked = ref('');
const stitchUpperUnmasked = ref('');
const stitchOutsoleUnmasked = ref('');
const stitchInsoleUnmasked = ref('');
const lastUnmasked = ref('');
defineExpose({
  drawUpperUnmasked,
  drawLiningUnmasked,
  stitchUpperUnmasked,
  stitchOutsoleUnmasked,
  stitchInsoleUnmasked,
  lastUnmasked,
});
const drawUpper = useField('drawUpper');
const drawLining = useField('drawLining');
const stitchUpper = useField('stitchUpper');
const stitchOutsole = useField('stitchOutsole');
const stitchInsole = useField('stitchInsole');
const last = useField('last');

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
            priceModel.drawUpper = laborCost.cost.toString();
            break;
          case Job.DrawLining:
            priceModel.drawLining = laborCost.cost.toString();
            break;
          case Job.StitchUpper:
            priceModel.stitchUpper = laborCost.cost.toString();
            break;
          case Job.StitchOutsole:
            priceModel.stitchOutsole = laborCost.cost.toString();
            break;
          case Job.StitchInsole:
            priceModel.stitchInsole = laborCost.cost.toString();
            break;
          case Job.Last:
            priceModel.last = laborCost.cost.toString();
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

// const optionsBackup: MaskInputOptions = {
//   mask: '9,99#',
//   tokens: {
//     9: { pattern: /[0-9]/, repeated: true },
//   },
//   reversed: true,
//   postProcess: (val) => (val ? `IDR${val}` : ''),
//   onMaska: (detail: MaskaDetail) => {},
// };
// const mask = new Mask(optionsBackup);

const options: MaskInputOptions = {
  number: { locale: 'us' },
  postProcess: (val) => (val ? `Rp ${val}` : ''),
  reversed: true,
};

watch(drawUpperUnmasked, (newValue) => {
  drawUpper.setValue(+newValue);
});
watch(drawLiningUnmasked, (newValue) => {
  drawLining.setValue(+newValue);
});
watch(stitchUpperUnmasked, (newValue) => {
  stitchUpper.setValue(+newValue);
});
watch(stitchOutsoleUnmasked, (newValue) => {
  stitchOutsole.setValue(+newValue);
});
watch(stitchInsoleUnmasked, (newValue) => {
  stitchInsole.setValue(+newValue);
});
watch(lastUnmasked, (newValue) => {
  last.setValue(+newValue);
});

// watchEffect(() => {
//   console.log(`Labor Cost Values : ${JSON.stringify(values)}`);
// });

function findCost(type: Job, array: any[]): number {
  return array.find((find) => find?.type === type);
}
</script>
