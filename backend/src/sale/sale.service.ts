import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SaleCreateDto } from './dto/sale-create.dto';
import { Sale } from '@/models/sale.model';

@Injectable()
export class SaleService {
  constructor(private prisma: PrismaService) {}

  async createSale(data: SaleCreateDto): Promise<Sale> {
    return await this.prisma.sale.create({
      data: {
        ...data,
        saleItems: {
          create: data.saleProducts.map((item) => ({
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
}
