import { TxType } from '@/generated/client';

export class InvTxCreateDto {
  invId: number;
  productId: number;
  invTxSizes: InvTxSizeCreateDto[];
  type: TxType;
  saleId?: number;
  trfId?: number;
  createdBy: number;
}

export class InvTxSizeCreateDto {
  sizeId: number;
  quantity: number;
}
