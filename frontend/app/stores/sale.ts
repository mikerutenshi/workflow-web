import { defineStore } from 'pinia';
import { type Sale } from '~/models/sale.model';

export const useSaleStore = defineStore('sale-store', {
  state: () => {
    return {
      sale: null as Sale | null,
      selectedInventoryId: null as string | null,
    };
  },
  actions: {
    removeItemByProductId(productId: string) {
      if (this.sale) {
        this.sale.saleItems = this.sale?.saleItems.filter(
          (item) => item.productId != productId,
        );
      }
    },
  },
});
