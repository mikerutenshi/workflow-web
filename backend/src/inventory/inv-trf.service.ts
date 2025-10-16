import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrf } from '@/models/inv-trf.model';
import { InvTrfPerItemDto } from './dto/inv-trf-per-item.dto';
import { InvTrfDto } from './dto/inv-trf.dto';

@Injectable()
export class InvTrfService {
  constructor(private prisma: PrismaService) {}

  createInvTrf(data: InvTrfCreateDto): Promise<InvTrf> {
    console.log(`data: ${JSON.stringify(data)}`);
    return this.prisma.invTrf.create({
      data: {
        ...data,
        invTrfItems: {
          create: data.invTrfItems.map((item) => ({
            ...item,
            invTrfItemSizes: {
              create: item.invTrfItemSizes.map((detail) => ({
                ...detail,
                sizeId: detail.sizeId,
                quantity: detail.quantity,
              })),
            },
          })),
        },
      },
      include: {
        invTrfItems: true,
        fromInv: true,
        toInv: true,
      },
    });
  }

  getInvTrfsPerItem(
    invId: number,
    productId: number,
  ): Promise<InvTrfPerItemDto[]> {
    return this.prisma.invTrfItem.findMany({
      include: {
        invTrf: { include: { fromInv: true, toInv: true } },
        invTrfItemSizes: { include: { size: true } },
      },
      where: {
        OR: [{ invTrf: { toInvId: invId } }, { invTrf: { fromInvId: invId } }],
        productId,
      },
      orderBy: {
        invTrfId: 'desc',
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
            product: true,
            invTrfItemSizes: { include: { size: true } },
          },
        },
      },
      orderBy: { id: 'desc' },
    });
  }
}
