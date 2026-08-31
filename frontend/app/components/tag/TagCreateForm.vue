<template>
  <v-form @submit.prevent="onSubmit" class="h-100 d-flex flex-column">
    <v-card-text>
      <v-row v-if="createError || updateError || deleteError">
        <v-col>
          <v-alert type="error">
            {{ extractGraphQlError(createError || updateError || deleteError) }}
          </v-alert>
        </v-col>
      </v-row>

      <v-text-field
        v-model="name.value.value"
        :error-messages="name.errorMessage.value"
        :label="$t('label.name')"
      />

      <v-switch
        v-model="archived.value.value"
        :label="$t('label.archived')"
        :error-messages="archived.errorMessage.value"
        color="primary"
        hide-details
      />
    </v-card-text>

    <v-card-actions>
      <v-spacer> </v-spacer>
      <ActionDelete
        v-if="tagId"
        :loading="isDeleting"
        @click="executeDelete({ id: tagId })"
      ></ActionDelete>
      <ActionConfirm v-if="tagId" :loading="isUpdating">{{
        $t('btn.update')
      }}</ActionConfirm>
      <ActionConfirm v-else :loading="isCreating">{{
        $t('btn.create')
      }}</ActionConfirm>
    </v-card-actions>
  </v-form>
</template>

<script setup lang="ts">
import { useMutation, useQuery } from 'villus';
import {
  CreateTagDocument,
  DeleteTagDocument,
  GetTagDocument,
  UpdateTagDocument,
} from '~/api/generated/types';
import { TagSchema } from '~/validation/schema';

const { t } = useI18n();
const emit = defineEmits(['form-submit']);
const props = defineProps<{
  tagId?: string | null;
  // Seeded from what the user typed into the picker, so "Create <name>" opens a
  // dialog that is already filled in rather than an empty one.
  initialName?: string;
}>();
const tagId = props.tagId;
const validationSchema = toTypedSchema(TagSchema);
const { handleSubmit, setValues } = useForm({
  validationSchema,
  initialValues: {
    name: props.initialName ?? '',
    archived: false,
  },
});
const name = useField('name');
const archived = useField<boolean>('archived');

const snack = useSnackbarStore();
const {
  execute: executeCreate,
  error: createError,
  isFetching: isCreating,
} = useMutation(CreateTagDocument, {
  onData(data) {
    emit('form-submit', data.createTag);
    snack.show(t('status.saved'), SnackColor.Success);
  },
  refetchTags: [CACHE_TAGS],
});
const {
  execute: executeUpdate,
  error: updateError,
  isFetching: isUpdating,
} = useMutation(UpdateTagDocument, {
  onData(data) {
    emit('form-submit', data.updateTag);
    snack.show(t('status.saved'), SnackColor.Success);
  },
  // Works carry their tags by reference, so a rename has to invalidate them too.
  refetchTags: [CACHE_TAGS, CACHE_TAG, CACHE_WORKS, CACHE_WORK],
});
const {
  execute: executeDelete,
  isFetching: isDeleting,
  error: deleteError,
} = useMutation(DeleteTagDocument, {
  refetchTags: [CACHE_TAGS],
  onData(data) {
    if (data.deleteTag) {
      emit('form-submit');
      snack.show(t('status.deleted'), SnackColor.Success);
    }
  },
  // A tag still attached to a work is refused rather than deleted. That message
  // names the count and points at archiving, so it must reach the user.
  onError(err) {
    snack.show(extractGraphQlError(err), SnackColor.Error);
  },
});

if (tagId) {
  useQuery({
    query: GetTagDocument,
    variables: { id: tagId },
    tags: [CACHE_TAG],
    onData(data) {
      const tag = data.getTag;
      if (tag) {
        setValues({
          name: tag.name,
          archived: tag.archived,
        });
      }
    },
  });
}

const onSubmit = handleSubmit((data) => {
  if (tagId) {
    executeUpdate({ id: tagId, data });
  } else {
    executeCreate({ data });
  }
});
</script>
