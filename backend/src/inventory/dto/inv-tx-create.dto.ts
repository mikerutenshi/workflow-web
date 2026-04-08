import { TxType } from '@/generated/prisma/client';

export class InvTxCreateDto {
  invId: number;
  productId: number;
  txNo: string;
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
