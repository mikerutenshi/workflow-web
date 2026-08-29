/**
 * The print buttons live in the app bar (`layouts/default.vue`) but the data
 * they print lives in the table component for that route. Each registry is a
 * module-scoped slot: the table registers a closure over its own data on mount,
 * and the app-bar button invokes it.
 *
 * Every call to this factory closes over its own refs, so one screen's handler
 * can never be invoked by another screen's button.
 */
export function createPrintRegistry() {
  const printHandler = ref<(() => void | Promise<void>) | null>(null);
  const isPrinting = ref(false);

  return function usePrintRegistry() {
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
  };
}
