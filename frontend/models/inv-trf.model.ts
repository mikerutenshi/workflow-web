import type { Progress } from '~/api/generated/types';

export interface Inventory {
  id: string;
  name: string;
  type: string;
  address: string;
  city: string;
  province: string;
}

export interface ProductGroup {
  id: string;
  skuNumeric: string;
  msrp?: number | null;
}

export interface Product {
  id: string;
  sku: string;
  productGroup: ProductGroup;
}

export interface Size {
  id: string;
  eu: string;
}

export interface InvTrfItemSize {
  invTrfItemId: string;
  size: Size;
  quantity: number;
}

export interface InvTrfItem {
  id: string;
  product: Product;
  progress: Progress;
  discount: string;
  invTrfItemSizes: InvTrfItemSize[];
}

export interface InvTrfDto {
  id: string;
  trfNo: string;
  fromInv?: Inventory | null;
  toInv: Inventory;
  trfDate: string;
  progress: Progress;
  invTrfItems: InvTrfItem[];
}

export class InvTrfModel implements InvTrfDto {
  id: string;
  trfNo: string;
  fromInv?: Inventory | null;
  toInv: Inventory;
  trfDate: string;
  progress: Progress;
  invTrfItems: InvTrfItem[];

  constructor(data: InvTrfDto) {
    this.id = data.id;
    this.trfNo = data.trfNo;
    this.fromInv = data.fromInv;
    this.toInv = data.toInv;
    this.trfDate = data.trfDate;
    this.progress = data.progress;
    this.invTrfItems = data.invTrfItems;
  }
}
