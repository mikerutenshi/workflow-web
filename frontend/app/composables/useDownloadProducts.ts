const downloadHandler = ref<(() => void | Promise<void>) | null>(null);
const isDownloading = ref(false);

export function useDownloadProducts() {
  function registerDownload(handler: () => void) {
    downloadHandler.value = handler;
  }

  function unregisterDownload() {
    downloadHandler.value = null;
  }

  async function download() {
    if (!downloadHandler.value || isDownloading.value) return;

    isDownloading.value = true;

    try {
      await downloadHandler.value();
    } finally {
      isDownloading.value = false;
    }
  }

  return {
    registerDownload,
    unregisterDownload,
    download,
    isDownloading,
  };
}
