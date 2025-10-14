import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { InvXferCreateDto } from './dto/inv-xfer-create.dto';
import { InvXfer } from '@/models/inv-xfer.model';
import { InvXferPerItemDto } from './dto/inv-xfer-per-item.dto';

@Injectable()
export class InvXferService {
  constructor(private prisma: PrismaService) {}

  async createInvXfer(data: InvXferCreateDto): Promise<InvXfer> {
    return await this.prisma.invXfer.create({
      data: {
        ...data,
        invXferItems: {
          create: data.invXferItems.map((item) => ({
            ...item,
            invXferItemSizes: {
              create: item.invXferItemSizes.map((detail) => ({
                ...detail,
                sizeId: detail.sizeId,
                quantity: detail.quantity,
              })),
            },
          })),
        },
      },
      include: {
        invXferItems: true,
        fromInv: true,
        toInv: true
      },
    });
  }

  async getInvXfersPerItem(
    invId: number,
    productId: number,
  ): Promise<InvXferPerItemDto[]> {
    return await this.prisma.invXferItem.findMany({
      include: {
        invXfer: { include: { fromInv: true, toInv: true } },
        invXferItemSizes: { include: { size: true } },
      },
      where: {
        OR: [
          { invXfer: { toInvId: invId } },
          { invXfer: { fromInvId: invId } },
        ],
        productId,
      },
    });
  }
}
