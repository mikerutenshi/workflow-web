<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="updateError || createError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(updateError || createError) }}
          </v-alert>
        </v-col>
      </v-row>

      <ActionPickDate
        v-model="date.value.value"
        :error-messages="date.errorMessage.value"
      ></ActionPickDate>

      <v-text-field
        :label="$t('label.order_no')"
        v-model="orderNo.value.value"
        :error-messages="
          orderNo.errorMessage.value || errorGenerateOrderNo?.message
        "
        :loading="isFetchingOrderNo"
        clearable
      ></v-text-field>

      <v-autocomplete
        :label="$t('label.product')"
        auto-select-first
        item-value="id"
        item-title="sku"
        :items="productsData?.getProducts"
        :loading="isFetchingProducts"
        v-model="productId.value.value"
        :error-messages="productId.errorMessage.value"
      >
        <template v-slot:item="{ props, item }">
          <v-list-item
            v-bind="props"
            :title="item.sku"
            :subtitle="
              [
                item.productGroup.productCategory.name,
                $t(renderGender(item.productGroup.productCategory.gender)),
                item.productGroup.name,
              ]
                .filter(Boolean)
                .join(' | ')
            "
          >
          </v-list-item>
        </template>
      </v-autocomplete>

      <v-select
        :label="$t('label.select_sizes')"
        multiple
        chips
        :items="computeSizeList"
        :loading="isFetchingSizes"
        item-title="eu"
        item-value="id"
        v-model="workSizes"
        return-object
        :error-messages="errors[`workSizes`]"
        :disabled="isSizesDisabled"
      >
      </v-select>

      <v-card v-if="isShowSizeQuantities" class="mb-4" variant="outlined">
        <v-card-title>{{ $t('card.fill_quantities') }}</v-card-title>
        <v-card-subtitle></v-card-subtitle>
        <v-card-text>
          <v-data-table
            :headers="sizeHeaders"
            :items="sizeQuantities"
            editable
            density="compact"
            :items-per-page="-1"
            hide-default-footer
          >
            <template #item.quantity="{ item, index }">
              <v-number-input
                v-model="item.quantity"
                :label="$t('label.quantity')"
                :min="1"
                density="compact"
                hide-details="auto"
                :error-messages="
                  (errors as any)[`workSizes[${index}].quantity`]
                "
              />
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>

      <v-row>
        <v-col>
          <v-autocomplete
            :label="$t('label.select_tags')"
            multiple
            chips
            closable-chips
            clearable
            auto-select-first
            item-title="name"
            item-value="id"
            return-object
            :items="availableTags"
            :loading="isFetchingTags"
            v-model="selectedTags"
            v-model:search="tagSearch"
            :error-messages="errors['tagIds']"
          >
            <template v-slot:item="{ props, item }">
              <v-list-item
                v-bind="props"
                :title="item.name"
                :subtitle="item.archived ? $t('label.archived') : undefined"
              >
                <template #prepend="{ isSelected }">
                  <v-checkbox-btn
                    :model-value="isSelected"
                    :ripple="false"
                    tabindex="-1"
                    aria-hidden
                    @click.prevent
                  ></v-checkbox-btn>
                </template>

                <template #append>
                  <v-btn
                    color="primary"
                    :icon="mdiPencil"
                    size="small"
                    variant="text"
                    @click.stop="showTagDialog(item.id)"
                  ></v-btn>
                </template>
              </v-list-item>
            </template>

            <template #menu-footer>
              <div class="d-flex align-center justify-space-between px-4 py-1">
                <span class="text-body-2">{{ $t('label.show_archived') }}</span>
                <v-switch
                  v-model="showArchivedTags"
                  :aria-label="$t('label.show_archived')"
                  color="primary"
                  density="compact"
                  hide-details
                  inset
                  class="flex-grow-0"
                ></v-switch>
              </div>
            </template>

            <template #no-data>
              <v-list-item
                v-if="tagSearch"
                :prepend-icon="mdiPlus"
                :title="$t('btn.add_tag')"
                :subtitle="tagSearch"
                base-color="primary"
                @click="showTagDialog(null, tagSearch)"
              ></v-list-item>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col
          cols="12"
          lg="3"
          xl="2"
          class="d-flex justify-end align-center ga-2"
        >
          <v-btn
            :prepend-icon="mdiPlus"
            color="primary"
            variant="tonal"
            @click="showTagDialog(null)"
            >{{ $t('btn.add_tag') }}</v-btn
          >
        </v-col>
      </v-row>

      <v-textarea
        v-model="note.value.value"
        :label="$t('label.note')"
        :error-messages="note.errorMessage.value"
        counter
        clearable
        :rules="[
          (v?: string) =>
            (v ?? '').length <= 255 ||
            $t('zodI18n.errors.too_big.string.inclusive', { maximum: 255 }),
        ]"
        rows="3"
      >
      </v-textarea>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <ActionConfirm :loading="isCreating || isUpdating">{{
        submitBtnTitle
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>

  <ActionEditItemDialog
    :dialogTitle="tagDialog.id ? $t('page.tag_edit') : $t('page.tag_create')"
    v-model="tagDialog.isVisible"
  >
    <TagCreateForm
      :key="tagDialog.key"
      :tag-id="tagDialog.id"
      :initial-name="tagDialog.name"
      @form-submit="handleTagSaved"
    ></TagCreateForm>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { mdiPencil, mdiPlus } from '@mdi/js';
import { useAuthStore } from '#imports';
import dayjs from 'dayjs';
import { useMutation, useQuery } from 'villus';
import { useRoute, useRouter } from 'vue-router';
import {
  CreateWorkDocument,
  Gender,
  GenerateOrderNoDocument,
  GetProductsDocument,
  GetSizesDocument,
  GetTagsDocument,
  GetWorkDocument,
  UpdateWorkDocument,
  type Size,
  type TagFragment,
} from '~/api/generated/types';
import { WorkSchema } from '~/validation/schema';

const { t } = useI18n();
const props = defineProps({
  workId: {
    type: String,
  },
});
const emit = defineEmits(['form-submit']);

const route = useRoute();
const workId = ref((route.params.id as string) || props.workId);

const { data: productsData, isFetching: isFetchingProducts } = useQuery({
  query: GetProductsDocument,
  tags: [CACHE_PRODUCTS],
});
const { data: sizesData, isFetching: isFetchingSizes } = useQuery({
  query: GetSizesDocument,
  tags: [CACHE_SIZES],
});
const { data: tagsData, isFetching: isFetchingTags } = useQuery({
  query: GetTagsDocument,
  tags: [CACHE_TAGS],
});

const selectedTags = ref<TagFragment[]>([]);
const tagSearch = ref('');

// Tags are managed from here rather than a settings screen, so archived ones
// have to stay reachable: without this toggle, archiving would be a one-way
// door with no way back to un-archive.
const showArchivedTags = ref(false);

// Archived tags are hidden, except any this work already carries -- dropping
// those from the list would deselect them, and the next save would strip them
// off a work order that is meant to keep its history.
const availableTags = computed(() => {
  const attached = new Set(selectedTags.value.map((tag) => tag.id));
  return (tagsData.value?.getTags ?? []).filter(
    (tag) => showArchivedTags.value || !tag.archived || attached.has(tag.id),
  );
});

// `key` remounts TagCreateForm so it re-reads initialName and the fetched tag;
// vee-validate seeds initialValues once per instance.
const tagDialog = reactive<{
  isVisible: boolean;
  id: string | null;
  name: string;
  key: number;
}>({
  isVisible: false,
  id: null,
  name: '',
  key: 0,
});

function showTagDialog(id: string | null, name = '') {
  tagDialog.id = id;
  tagDialog.name = name;
  tagDialog.key += 1;
  tagDialog.isVisible = true;
}

function handleTagSaved(tag?: TagFragment) {
  tagDialog.isVisible = false;

  // No payload means it was deleted. A tag attached to a saved work order
  // cannot be deleted, but one picked in a form that has not been submitted yet
  // can -- and leaving it selected would fail the save on a missing foreign key.
  if (!tag) {
    if (tagDialog.id) {
      const deletedId = tagDialog.id;
      selectedTags.value = selectedTags.value.filter(
        (item) => item.id !== deletedId,
      );
    }
    return;
  }

  // Select a tag the moment it is created, so the picker does not send the user
  // hunting for what they just typed. An edit refreshes the copy already held.
  const existing = selectedTags.value.findIndex((item) => item.id === tag.id);
  if (existing >= 0) {
    selectedTags.value = selectedTags.value.map((item) =>
      item.id === tag.id ? { ...tag } : item,
    );
  } else if (!tagDialog.id) {
    selectedTags.value = [...selectedTags.value, { ...tag }];
  }
  tagSearch.value = '';
}

const computeSizeList = computed(() => {
  const product = productsData.value?.getProducts.find(
    (product) => product.id === productId.value.value,
  );
  const gender = product?.productGroup.productCategory.gender;
  return gender == Gender.Men || gender == Gender.Women
    ? sizesData.value?.getSizes.filter((size) => size.gender == gender)
    : sizesData.value?.getSizes;
});

const router = useRouter();
const submitBtnTitle = computed(() =>
  workId.value ? t('btn.update') : t('btn.create'),
);

const {
  execute: executeCreate,
  isFetching: isCreating,
  error: createError,
} = useMutation(CreateWorkDocument, {
  refetchTags: [CACHE_WORKS],
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
});
const {
  execute: executeUpdate,
  isFetching: isUpdating,
  error: updateError,
} = useMutation(UpdateWorkDocument, {
  refetchTags: [CACHE_WORK, CACHE_WORKS],
  onData() {
    emit('form-submit');
    snack.show(t('status.saved'), SnackColor.Success);
  },
});
const authStore = useAuthStore();
const snack = useSnackbarStore();

const validationSchema = toTypedSchema(WorkSchema);
const { handleSubmit, setValues, setFieldValue, values, errors } = useForm({
  validationSchema,
  initialValues: {
    date: dayjs().toISOString(),
    workSizes: [],
    tagIds: [],
  },
});
const date = useField<string>('date');
const orderNo = useField('orderNo');
const productId = useField('productId');

const {
  isFetching: isFetchingOrderNo,
  execute: generateOrderNo,
  error: errorGenerateOrderNo,
} = useQuery({
  query: GenerateOrderNoDocument,
  cachePolicy: 'network-only',
  onData(data) {
    const current = orderNo.value.value as string | undefined;
    // Fill an empty field, or replace a number we generated earlier (the
    // date watcher below refetches on every change). Never overwrite one
    // the user typed in from the external system.
    if (!current || /^[A-Z]{2,3}-/.test(current)) {
      orderNo.setValue(data.generateOrderNo);
    }
  },
  fetchOnMount: false,
});
const note = useField('note');
const { fields, push, remove, replace } = useFieldArray('workSizes');

const isShowSizeQuantities = ref(false);
const isSizesDisabled = ref(true);

const workSizes = ref<Size[]>([]);
const sizeQuantities = reactive<
  Array<{ id: string; title: string; quantity: number }>
>([]);
const sizeHeaders = ref([
  { title: t('label.size'), key: 'title', sortable: false },
  { title: t('label.quantity'), key: 'quantity', sortable: false },
]);

const onSubmit = handleSubmit((data) => {
  if (!workId.value) {
    executeCreate({ data });
  } else {
    executeUpdate({ id: workId.value, data });
  }
});

if (!workId.value) {
  generateOrderNo({ variables: { date: date.value.value } });
}

if (workId.value) {
  useQuery({
    query: GetWorkDocument,
    variables: { id: workId.value },
    tags: [CACHE_WORK],
    onData(data) {
      const work = data.getWork;
      setValues({
        date: work.date,
        orderNo: work.orderNo,
        productId: work.productId,
      });
      workSizes.value = work.workSizes.map((item) => ({
        id: item.size.id,
        eu: item.size.eu,
        gender: item.size.gender,
        jp: item.size.jp,
        uk: item.size.uk,
        us: item.size.us,
      }));
      work.workSizes.forEach((item) => {
        const sizeInTable = sizeQuantities.find(
          (size) => size.id === item.size.id,
        );
        if (sizeInTable) {
          sizeInTable.quantity = item.quantity;
        } else {
          sizeQuantities.push({
            id: item.size.id,
            title: item.size.eu,
            quantity: item.quantity,
          });
        }
      });
      selectedTags.value = work.tags.map((tag) => ({ ...tag }));
      note.setValue(work.note);
    },
  });
}

watch(
  productId.value,
  (newId, oldId) => {
    if (newId && oldId === undefined) {
      isSizesDisabled.value = false;
    } else if ((newId && oldId) || (newId && oldId == null)) {
      isSizesDisabled.value = false;
      workSizes.value = [];
    } else {
      isSizesDisabled.value = true;
    }
  },
  { immediate: true },
);

watch(workSizes, (newSizes) => {
  isShowSizeQuantities.value = newSizes.length > 0;

  sizeQuantities.splice(
    0,
    sizeQuantities.length,
    ...newSizes.map((item) => {
      const existing = sizeQuantities.find((i) => i.id === item.id);
      return {
        id: item.id,
        title: item.eu,
        quantity: existing ? existing.quantity : 1,
      };
    }),
  );
});

watch(sizeQuantities, (newItems) => {
  replace(
    newItems.map((newItem) => ({
      id: newItem.id,
      quantity: newItem.quantity,
    })),
  );
});

watch(selectedTags, (tags) => {
  setFieldValue(
    'tagIds',
    tags.map((tag) => tag.id),
  );
});

watch(date.value, (newDate) => {
  if (!workId.value && newDate) {
    generateOrderNo({ variables: { date: date.value.value } });
  }
});
</script>
