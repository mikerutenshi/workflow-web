<template>
  <ComingSoon></ComingSoon>

  <ActionEditItemDialog :dialogTitle="dialog.title" v-model="dialog.isVisible">
    <span>CContent</span>
  </ActionEditItemDialog>
</template>

<script setup lang="ts">
import { useDate } from 'vuetify';

const { t } = useI18n();
const adapter = useDate();

const dialogStore = useDialogStore();
const { isFormDialogOpen } = storeToRefs(dialogStore);
enum DialogContent {
  View = 'VIEW',
  None = 'NONE',
  Edit = 'EDIT',
  Create = 'CREATE',
}
const dialog = reactive({
  payloadId: null as string | null,
  title: '',
  content: DialogContent.None,
  isVisible: false,
  isReadonly: false,
});

watch(isFormDialogOpen, (isOpen) => {
  if (isOpen) {
    showDialog(DialogContent.Create);
  }
});
watch(
  () => [dialog.isVisible, dialog.content],
  ([visible, content]) => {
    if (!visible && content === DialogContent.Create) {
      // executeFetch();
      dialogStore.closeFormDialog();
    }
  },
);

function showDialog(content: DialogContent, payloadId?: string | undefined) {
  dialog.payloadId = payloadId ?? null;

  switch (content) {
    case DialogContent.Create:
      dialog.content = DialogContent.Create;
      dialog.title = t('page.sale_create');
      dialog.isReadonly = false;
      dialog.isVisible = true;
      break;
    case DialogContent.Edit:
      dialog.content = DialogContent.Edit;
      dialog.title = t('page.sale_edit');
      dialog.isReadonly = false;
      dialog.isVisible = true;
      break;
    // case DialogContent.View:
    //   dialog.content = DialogContent.View;
    //   dialog.title = t('page.sale_view');
    //   dialog.isReadonly = true;
    //   dialog.isVisible = true;
    //   break;
  }
}
</script>
