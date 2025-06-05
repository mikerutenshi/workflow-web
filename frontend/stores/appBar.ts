export const useAppBarStore = defineStore('appbar-store', () => {
  const isPrintClicked = ref(false);
  const isPrinting = ref(false);

  return { isPrintClicked, isPrinting };
});
