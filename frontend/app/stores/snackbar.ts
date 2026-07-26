import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar-store', {
  state: () => {
    return {
      isVisible: false,
      message: 'Saved',
      color: SnackColor.Success,
      timeout: 5000,
    };
  },
  actions: {
    show(message: string, color: SnackColor, timeout?: number) {
      this.isVisible = true;
      this.message = message;
      this.color = color;
      if (timeout) this.timeout = timeout;
    },

    hide() {
      this.isVisible = false;
    },
  },
});
