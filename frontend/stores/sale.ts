import { defineStore } from 'pinia';
import { type Sale } from '~/models/sale.model';

export const useSaleStore = defineStore('sale-store', {
  state: () => {
    return { sale: null as Sale | null };
  },
});
