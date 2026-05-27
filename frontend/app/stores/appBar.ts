export const useAppBarStore = defineStore('appbar-store', () => {
  const isPrintClicked = ref(false);
  const isPrinting = ref(false);
  const isFormDialogOpen = ref(false);
  const isUploadDialogOpen = ref(false);

  function openFormDialog() {
    isFormDialogOpen.value = true;
  }
  function closeFormDialog() {
    isFormDialogOpen.value = false;
  }

  function openUploadDialog() {
    isUploadDialogOpen.value = true;
  }
  function closeUploadDialog() {
    isUploadDialogOpen.value = false;
  }

  return {
    isPrintClicked,
    isPrinting,
    isFormDialogOpen,
    isUploadDialogOpen,
    openFormDialog,
    closeFormDialog,
    openUploadDialog,
    closeUploadDialog,
  };
});
