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

@Injectable()
export class InvTrfService {
  constructor(private prisma: PrismaService) {}

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
    console.log(`Create Dto: ${JSON.stringify(data)}`);
    const { invTrfItemIds, ...rest } = data;
    return this.prisma.invTrf.create({
      data: {
        ...rest,
        invTrfItems: {
          connect: invTrfItemIds.map((id) => ({ id })),
        },
      },
      include: {
        invTrfItems: true,
      },
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
      },
    });
  }

  getInvTrfs(): Promise<InvTrfDto[]> {
    return this.prisma.invTrf.findMany({
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
      orderBy: { id: 'desc' },
    });
  }

  async deleteInvTrfItem(id: number): Promise<Boolean> {
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
