import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InvTxCreateDto } from './dto/inv-tx-create.dto';
import { Prisma, Progress, TxType } from '@/generated/client';
import { InvTx } from '@/models/inv-tx.model';
import { InvTxDto } from './dto/inv-tx.dto';

@Injectable()
export class InvTxService {
  constructor(private prisma: PrismaService) {}

  createInvTxOp(
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
      include: { invTxSizes: { include: { size: true } } },
    });
  }

  async getInvTxs(invId: number, productId: number): Promise<InvTxDto[]> {
    const txs = await this.prisma.invTx.findMany({
      include: {
        invTxSizes: {
          include: { size: true },
          orderBy: { size: { eu: 'asc' } },
        },
        sale: true,
        invTrf: true,
      },
      where: {
        invId,
        productId,
      },
    });
    return txs.map((t) => ({
      txNo: t.saleId ? (t.sale?.saleNo ?? 'N/A') : (t.invTrf?.trfNo ?? 'N/A'),
      txDate: t.saleId
        ? (t.sale?.date ?? t.createdAt)
        : (t.invTrf?.trfDate ?? t.createdAt),
      progress: t.saleId
        ? Progress.COMPLETED
        : (t.invTrf?.progress ?? Progress.COMPLETED),
      ...t,
    }));
  }
}
