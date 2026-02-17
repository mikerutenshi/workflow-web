import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InvTxCreateDto } from './dto/inv-tx-create.dto';
import { Prisma, TxType } from '@/generated/client';
import { InvTx } from '@/models/inv-tx.model';

@Injectable()
export class InvTxService {
  constructor() {}

  createInvTx(
    data: InvTxCreateDto,
    tx: Prisma.TransactionClient,
  ): Promise<InvTx> {
    return tx.invTx.create({
      data: {
        invId: data.invId,
        productId: data.productId,
        invTxSizes: {
          create: data.invTxSizes.map((size) => ({
            size: { connect: { id: size.sizeId } },
            quantity: size.quantity,
          })),
        },
        type: data.type,
        saleId: data.saleId,
        trfId: data.trfId,
        createdBy: data.createdBy,
      },
      include: { invTxSizes: true },
    });
  }
}
