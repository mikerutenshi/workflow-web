import type { ItemSize } from './size.model';

export interface Sale {
  invId: string;
  saleNo: string;
  date: string;
  saleItems: SaleItem[];
}

export interface SaleItem {
  productId: string;
  saleItemSizes: ItemSize[];
}
