import { defineStore } from 'pinia';

/**
 * The warehouse the Stock Adjustments table is currently filtered to, shared so
 * the app-bar New button in the layout can gate on it and seed the create form.
 * InvAdjTable renders through the layout's slot, so props cannot carry it.
 *
 * null means "All Warehouses", which is not a valid target for a count sheet.
 */
export const useInvAdjStore = defineStore('inv-adj-store', {
  state: () => {
    return {
      selectedInventoryId: null as string | null,
    };
  },
});
