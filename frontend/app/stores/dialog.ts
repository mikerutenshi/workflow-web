export const useDialogStore = defineStore('dialog-store', () => {
  const isFormDialogOpen = ref(false);

  function openFormDialog() {
    isFormDialogOpen.value = true;
  }
  function closeFormDialog() {
    isFormDialogOpen.value = false;
  }

  return { isFormDialogOpen, openFormDialog, closeFormDialog };
});
