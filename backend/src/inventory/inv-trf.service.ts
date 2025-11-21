import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrf } from '@/models/inv-trf.model';
import { InvTrfItemTrfDto } from './dto/inv-trf-item-trf.dto';
import { InvTrfDto } from './dto/inv-trf.dto';
import { InvTrfItemCreateDto } from './dto/inv-trf-item-create.dto';
import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrfItemDto } from './dto/inv-trf-item.dto';
import { Progress } from '@/generated/client';
import { InvTrfUpdateDto } from './dto/inv-trf-update.dto';
import { generateId } from '@/utils/functions.util';
import { Operation } from '@/models/operation.enum';
import { InvProductService } from './inv-product.service';

@Injectable()
export class InvTrfService {
  constructor(
    private prisma: PrismaService,
    private invProductService: InvProductService,
  ) {}

  createInvTrfItem(data: InvTrfItemCreateDto): Promise<InvTrfItem> {
    return this.prisma.invTrfItem.create({
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
        invTrfItemSizes: { include: { size: true } },
      },
    });
  }

  createInvTrf(data: InvTrfCreateDto): Promise<InvTrf> {
    const { invTrfItemIds, ...rest } = data;
    return this.prisma.$transaction(async (tx) => {
      invTrfItemIds.map(async (id) => {
        await tx.invTrfItem.update({
          where: { id },
          data: { progress: data.progress },
        });
      });
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
        for (const item of finalTrfData.invTrfItems) {
          await this.invProductService.upsertInvProduct({
            invId: item.toInvId,
            productId: item.productId,
            invProductSizes: item.invTrfItemSizes.map((itemSizes) => ({
              sizeId: itemSizes.sizeId,
              quantity: itemSizes.quantity,
            })),
            price: 0,
          });

          if (item.fromInvId) {
            await this.invProductService.decrementInvProduct({
              invId: item.fromInvId,
              productId: item.productId,
              invProductSizes: item.invTrfItemSizes.map((s) => ({
                sizeId: s.sizeId,
                quantity: s.quantity,
              })),
            });
          }
        }
      } else if (
        initTrfData.progress === Progress.COMPLETED &&
        data.progress !== Progress.COMPLETED
      ) {
        for (const item of finalTrfData.invTrfItems) {
          await this.invProductService.decrementInvProduct({
            invId: item.toInvId,
            productId: item.productId,
            invProductSizes: item.invTrfItemSizes.map((s) => ({
              sizeId: s.sizeId,
              quantity: s.quantity,
            })),
          });

          if (item.fromInvId) {
            await this.invProductService.upsertInvProduct({
              invId: item.fromInvId,
              productId: item.productId,
              invProductSizes: item.invTrfItemSizes.map((itemSizes) => ({
                sizeId: itemSizes.sizeId,
                quantity: itemSizes.quantity,
              })),
              price: 0,
            });
          }
        }
      }

      return finalTrfData;
    });
  }

  getInvTrfItemTrfs(
    invId: number,
    productId: number,
  ): Promise<InvTrfItemTrfDto[]> {
    return this.prisma.invTrfItem.findMany({
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
  }

  getInvTrfItems(fromInvId: number, toInvId: number): Promise<InvTrfItemDto[]> {
    return this.prisma.invTrfItem.findMany({
      where: { fromInvId, toInvId, progress: { not: Progress.COMPLETED } },
      include: {
        product: true,
        fromInv: true,
        toInv: true,
        invTrfItemSizes: {
          include: { size: true },
          orderBy: { sizeId: 'asc' },
        },
        invTrf: true,
      },
    });
  }

  async getInvTrfs(): Promise<InvTrfDto[]> {
    const data = await this.prisma.invTrf.findMany({
      include: {
        fromInv: true,
        toInv: true,
        invTrfItems: {
          include: {
            fromInv: true,
            toInv: true,
            product: true,
            invTrfItemSizes: { include: { size: true } },
          },
        },
        work: { select: { orderNo: true } },
      },
      orderBy: { id: 'desc' },
    });

    const mapped = data.map((item) => ({
      ...item,
      orderNo: item.work?.orderNo ?? null,
    }));

    return mapped;
  }

  async getInvTrf(id: number): Promise<InvTrfDto> {
    const result = await this.prisma.invTrf.findUnique({
      where: { id },
      include: {
        fromInv: true,
        toInv: true,
        invTrfItems: {
          include: {
            fromInv: true,
            toInv: true,
            product: true,
            invTrfItemSizes: { include: { size: true } },
          },
        },
      },
    });

    if (!result) {
      throw new Error(`Inventory Transfer with ID ${id} not found.`);
    }
    return result;
  }

  async deleteInvTrf(id: number): Promise<Boolean> {
    const result = await this.prisma.invTrf.delete({
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
      orderBy: { id: 'desc' },
    });
    const lastTrfNo = lastTrf?.trfNo;

    return generateId(Operation.Transfer, lastTrfNo);
  }

  async generateInvTrfPrdNo(): Promise<string> {
    const lastInvPrd = await this.prisma.invTrf.findFirst({
      where: { workId: { not: null } },
      orderBy: { id: 'desc' },
    });
    const lastNo = lastInvPrd?.trfNo;

    return generateId(Operation.Produce, lastNo);
  }

  async deleteInvTrfItem(id: number): Promise<Boolean> {
    const alreadyInInvTrf = await this.prisma.invTrfItem.findMany({
      where: {
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
