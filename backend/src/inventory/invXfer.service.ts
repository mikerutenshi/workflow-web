import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { InvXferCreateDto } from './dto/inv-xfer-create.dto';
import { InvXfer } from '@/models/inv-xfer.model';

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
        invXferItems: {
          include: {
            invXferItemSizes: { include: { size: true } },
          },
        },
      },
    });
  }
}
