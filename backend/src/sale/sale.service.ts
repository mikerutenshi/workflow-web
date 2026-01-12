import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SaleCreateDto } from './dto/sale-create.dto';
import { Sale } from '@/models/sale.model';
import { Operation } from '@/models/operation.enum';
import { generateId } from '@/utils/functions.util';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async createSale(data: SaleCreateDto): Promise<Sale> {
    return await this.prisma.sale.create({
      data: {
        ...data,
        saleItems: {
          create: data.saleItems.map((item) => ({
            invProduct: {
              connect: {
                invId_productId: {
                  invId: item.invId,
                  productId: item.productId,
                },
              },
            },
            saleProductSizes: {
              create: item.saleItemSizes.map((size) => ({
                size: {
                  connect: { id: size.sizeId },
                },
                quantity: size.quantity,
              })),
            },
          })),
        },
      },
      include: {
        saleItems: {
          include: {
            saleItemSizes: { include: { size: true } },
          },
        },
      },
    });
  }

  async getSales(): Promise<Sale[]> {
    return await this.prisma.sale.findMany({
      include: {
        saleItems: {
          include: {
            saleItemSizes: { include: { size: true } },
          },
        },
      },
    });
  }

  async generateSaleNo(): Promise<string> {
    const lastSale = await this.prisma.sale.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    const lastSaleNo = lastSale?.saleNo;

    return generateId(Operation.Sale, lastSaleNo);
  }
}
