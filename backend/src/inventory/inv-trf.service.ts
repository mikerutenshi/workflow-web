import { Prisma, Progress, TxType } from '@/generated/prisma/client';
import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { Operation } from '@/models/operation.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { generateId } from '@/utils/functions.util';
import { Injectable } from '@nestjs/common';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrfItemCreateDto } from './dto/inv-trf-item-create.dto';
import { InvTrfItemTrfDto } from './dto/inv-trf-item-trf.dto';
import { InvTrfItemDto } from './dto/inv-trf-item.dto';
import { InvTrfSimpleDto } from './dto/inv-trf-simple.dto';
import { InvTrfUpdateDto } from './dto/inv-trf-update.dto';
import { InvTrfDto } from './dto/inv-trf.dto';
import { InvProductService } from './inv-product.service';
import { InvTxService } from './inv-tx.service';

@Injectable()
export class InvTrfService {
  constructor(
    private prisma: PrismaService,
    private invProductService: InvProductService,
    private invTxService: InvTxService,
  ) {}

  async createInvTrfItem(
    data: InvTrfItemCreateDto,
    tx?: Prisma.TransactionClient,
  ): Promise<InvTrfItem> {
    const prisma = tx ?? this.prisma;

    const { discount, ...rest } = await prisma.invTrfItem.create({
      data: {
        ...data,
        invTrfItemSizes: {
          create: data.invTrfItemSizes.map((item) => ({
            size: { connect: { id: item.sizeId } },
            quantity: item.quantity,
          })),
        },
      },
      include: {
        fromInv: true,
        toInv: true,
        invTrfItemSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
      },
    });

    return { ...rest, discount: discount?.toFixed(4) || null };
  }

  async createInvTrf(
    data: InvTrfCreateDto,
    tx?: Prisma.TransactionClient,
  ): Promise<InvTrf> {
    const { invTrfItemIds, ...rest } = data;

    if (tx) {
      await Promise.all(
        invTrfItemIds.map(async (id) => {
          await tx.invTrfItem.update({
            where: { id },
            data: { progress: data.progress },
          });
        }),
      );
      const result = await tx.invTrf.create({
        data: {
          ...rest,
          invTrfItems: {
            connect: invTrfItemIds.map((id) => ({ id })),
          },
        },
      });

      return result;
    } else {
      return this.prisma.$transaction(async (tx) => {
        await Promise.all(
          invTrfItemIds.map(async (id) => {
            await tx.invTrfItem.update({
              where: { id },
              data: { progress: data.progress },
            });
          }),
        );
        const result = await tx.invTrf.create({
          data: {
            ...rest,
            invTrfItems: {
              connect: invTrfItemIds.map((id) => ({ id })),
            },
          },
        });

        return result;
      });
    }
  }

  updateInvTrf(id: number, data: InvTrfUpdateDto): Promise<InvTrf> {
    const { invTrfItemIds, ...rest } = data;
    return this.prisma.$transaction(async (tx) => {
      const initTrfData = await tx.invTrf.findUniqueOrThrow({
        where: { id },
        include: { invTrfItems: { include: { invTrfItemSizes: true } } },
      });

      invTrfItemIds.map(async (id) => {
        await tx.invTrfItem.update({
          where: { id },
          data: { progress: data.progress },
        });
      });

      const finalTrfData = await tx.invTrf.update({
        where: { id },
        data: {
          ...rest,
          invTrfItems: {
            set: invTrfItemIds.map((id) => ({ id })),
          },
        },
        include: { invTrfItems: { include: { invTrfItemSizes: true } } },
      });

      if (
        initTrfData.progress !== Progress.COMPLETED &&
        data.progress === Progress.COMPLETED
      ) {
        await Promise.all(
          finalTrfData.invTrfItems.map(async (item) => {
            await this.invProductService.upsertInvProductOp(
              {
                invId: item.toInvId,
                productId: item.productId,
                invProductSizes: item.invTrfItemSizes.map((itemSizes) => ({
                  sizeId: itemSizes.sizeId,
                  quantity: itemSizes.quantity,
                })),
              },
              tx,
            );
            await this.invTxService.createInvTxOp(
              {
                invId: item.toInvId,
                productId: item.productId,
                txNo: initTrfData.trfNo,
                invTxSizes: item.invTrfItemSizes.map((size) => ({
                  sizeId: size.sizeId,
                  quantity: size.quantity,
                })),

                type: TxType.TRANSFER_IN,
                saleId: undefined,
                trfId: id,
                createdBy: data.updatedBy,
              },
              tx,
            );

            if (item.fromInvId) {
              await this.invProductService.decrementInvProductOp(
                item.fromInvId,
                item.productId,
                item.invTrfItemSizes.map((s) => ({
                  sizeId: s.sizeId,
                  quantity: s.quantity,
                })),
                tx,
              );

              await this.invTxService.createInvTxOp(
                {
                  invId: item.fromInvId,
                  productId: item.productId,
                  txNo: initTrfData.trfNo,
                  invTxSizes: item.invTrfItemSizes.map((size) => ({
                    sizeId: size.sizeId,
                    quantity: -size.quantity,
                  })),

                  type: TxType.TRANSFER_OUT,
                  saleId: undefined,
                  trfId: id,
                  createdBy: data.updatedBy,
                },
                tx,
              );
            }

            await tx.invToProduct.update({
              data: { discount: item.discount },
              where: {
                invId_productId: {
                  invId: item.toInvId,
                  productId: item.productId,
                },
              },
            });
          }),
        );
      } else if (
        initTrfData.progress === Progress.COMPLETED &&
        data.progress !== Progress.COMPLETED
      ) {
        await Promise.all(
          finalTrfData.invTrfItems.map(async (item) => {
            await this.invProductService.decrementInvProductOp(
              item.toInvId,
              item.productId,
              item.invTrfItemSizes.map((s) => ({
                sizeId: s.sizeId,
                quantity: s.quantity,
              })),
              tx,
            );

            if (item.fromInvId) {
              await this.invProductService.upsertInvProductOp(
                {
                  invId: item.fromInvId,
                  productId: item.productId,
                  invProductSizes: item.invTrfItemSizes.map((itemSizes) => ({
                    sizeId: itemSizes.sizeId,
                    quantity: itemSizes.quantity,
                  })),
                },
                tx,
              );
            }
          }),
        );
      }

      return finalTrfData;
    });
  }

  async getInvTrfItemTrfs(
    invId: number,
    productId: number,
  ): Promise<InvTrfItemTrfDto[]> {
    const result = await this.prisma.invTrfItem.findMany({
      include: {
        invTrf: { include: { fromInv: true, toInv: true } },
        invTrfItemSizes: {
          include: { size: true },
          orderBy: { sizeId: 'asc' },
        },
        fromInv: true,
        toInv: true,
      },
      where: {
        OR: [{ fromInvId: invId }, { toInvId: invId }],
        productId,
      },
      orderBy: {
        id: 'desc',
      },
    });

    return result.map((item) => ({
      ...item,
      discount: item.discount?.toFixed(4) || null,
    }));
  }

  async getInvTrfItems(
    fromInvId: number,
    toInvId: number,
    progress?: Progress,
  ): Promise<InvTrfItemDto[]> {
    const result = await this.prisma.invTrfItem.findMany({
      where: { fromInvId, toInvId, progress: progress as Progress },
      include: {
        product: {
          include: {
            productGroup: {
              include: {
                productCategory: true,
              },
            },
            productColors: { include: { color: true } },
          },
        },
        fromInv: true,
        toInv: true,
        invTrfItemSizes: {
          include: { size: true },
          orderBy: { sizeId: 'asc' },
        },
        invTrf: true,
      },
    });

    return result.map((item) => ({
      ...item,
      discount: item.discount?.toFixed(4) || null,
    }));
  }

  async getInvTrfs(): Promise<InvTrfSimpleDto[]> {
    const data = await this.prisma.invTrf.findMany({
      include: {
        fromInv: true,
        toInv: true,
        work: true,
      },
      orderBy: { id: 'desc' },
    });

    return data;
  }

  async getInvTrf(
    id: number,
    tx?: Prisma.TransactionClient,
  ): Promise<InvTrfDto> {
    const prisma = tx ?? this.prisma;
    const result = await prisma.invTrf.findUnique({
      where: { id },
      include: {
        fromInv: true,
        toInv: true,
        invTrfItems: {
          include: {
            fromInv: true,
            toInv: true,
            product: {
              include: {
                productGroup: {
                  include: {
                    productCategory: true,
                  },
                },
                productColors: { include: { color: true } },
              },
            },
            invTrfItemSizes: {
              include: { size: true },
              orderBy: [{ sizeId: 'asc' }],
            },
          },
        },
      },
    });

    if (!result) {
      throw new Error(`Inventory Transfer with ID ${id} not found.`);
    }

    return {
      ...result,
      invTrfItems: result.invTrfItems.map((item) => ({
        ...item,
        discount: item.discount?.toFixed(4) || null,
      })),
    };
  }

  async deleteInvTrf(
    id: number,
    tx?: Prisma.TransactionClient,
  ): Promise<Boolean> {
    const prisma = tx ?? this.prisma;

    const result = await prisma.invTrf.delete({
      where: { id },
    });

    if (!result) {
      throw new Error(`Delete Transfer with ID: ${id} failed`);
    }

    return true;
  }

  async generateInvTrfNo(): Promise<string> {
    const lastTrf = await this.prisma.invTrf.findFirst({
      where: { workId: null },
      orderBy: { createdAt: 'desc' },
    });
    const lastTrfNo = lastTrf?.trfNo;

    return generateId(Operation.Transfer, lastTrfNo);
  }

  async generateInvTrfPrdNoOp(tx: Prisma.TransactionClient): Promise<string> {
    const lastInvPrd = await tx.invTrf.findFirst({
      where: { workId: { not: null } },
      orderBy: { createdAt: 'desc' },
    });
    const lastNo = lastInvPrd?.trfNo;

    return generateId(Operation.Produce, lastNo);
  }

  async deleteInvTrfItem(id: number): Promise<Boolean> {
    const alreadyInInvTrf = await this.prisma.invTrfItem.findMany({
      where: {
        id,
        invTrf: {
          isNot: null,
        },
      },
    });

    if (alreadyInInvTrf.length > 0) {
      throw new Error('Already in an Inventory Transfer');
    }

    const invTrfItem = await this.prisma.invTrfItem.delete({
      where: { id },
    });

    if (!invTrfItem) {
      throw new Error(`Delete invTrfItem with id ${id} failed.`);
    } else {
      return true;
    }
  }
}
