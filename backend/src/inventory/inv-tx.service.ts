import { Prisma, Progress } from '@/generated/prisma/client';
import { InvTx } from '@/models/inv-tx.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InvTxCreateDto } from './dto/inv-tx-create.dto';
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
        txNo: data.txNo,
        invTxSizes: {
          create: data.invTxSizes.map((size) => ({
            size: { connect: { id: size.sizeId } },
            quantity: size.quantity,
          })),
        },
        type: data.type,
        saleId: data.saleId,
        trfId: data.trfId,
        adjId: data.adjId,
        createdBy: data.createdBy,
      },
      include: {
        invTxSizes: { include: { size: true }, orderBy: [{ sizeId: 'asc' }] },
      },
    });
  }

  async getInvTxs(invId: number, productId: number): Promise<InvTxDto[]> {
    const txs = await this.prisma.invTx.findMany({
      include: {
        invTxSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
        sale: true,
        invTrf: true,
        invAdj: true,
      },
      where: {
        invId,
        productId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return txs.map((t) => ({
      ...t,
      txNo: t.saleId
        ? (t.sale?.saleNo ?? t.txNo)
        : t.trfId
          ? (t.invTrf?.trfNo ?? t.txNo)
          : (t.invAdj?.adjNo ?? t.txNo),
      txDate: t.saleId
        ? (t.sale?.date ?? t.createdAt)
        : t.trfId
          ? (t.invTrf?.trfDate ?? t.createdAt)
          : (t.invAdj?.adjDate ?? t.createdAt),
      progress: t.saleId
        ? Progress.COMPLETED
        : t.trfId
          ? (t.invTrf?.progress ?? Progress.COMPLETED)
          : (t.invAdj?.progress ?? Progress.COMPLETED),
    }));
  }
}
