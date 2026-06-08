export const useAppBarStore = defineStore('appbar-store', () => {
  const isFormDialogOpen = ref(false);

  function openFormDialog() {
    isFormDialogOpen.value = true;
  }
  function closeFormDialog() {
    isFormDialogOpen.value = false;
  }

  return {
    isFormDialogOpen,
    openFormDialog,
    closeFormDialog,
  };
});
