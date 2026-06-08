export const useAppBarStore = defineStore('appbar-store', () => {
  const isPrintClicked = ref(false);
  const isPrinting = ref(false);
  const isFormDialogOpen = ref(false);

  function openFormDialog() {
    isFormDialogOpen.value = true;
  }
  function closeFormDialog() {
    isFormDialogOpen.value = false;
  }

  return {
    isPrintClicked,
    isPrinting,
    isFormDialogOpen,
    openFormDialog,
    closeFormDialog,
  };
});
