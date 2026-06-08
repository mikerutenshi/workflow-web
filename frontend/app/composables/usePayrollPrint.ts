const printHandler = ref<(() => void | Promise<void>) | null>(null);
const isPrinting = ref(false);

export function usePayrollPrint() {
  function registerPrint(handler: () => void | Promise<void>) {
    printHandler.value = handler;
  }

  function unregisterPrint() {
    printHandler.value = null;
  }

  async function print() {
    if (!printHandler.value || isPrinting.value) return;

    isPrinting.value = true;
    try {
      await printHandler.value();
    } finally {
      isPrinting.value = false;
    }
  }

  return {
    registerPrint,
    unregisterPrint,
    print,
    isPrinting,
  };
}
