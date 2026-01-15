import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { SaleCreateDto } from './dto/sale-create.dto';
import { Sale } from '@/models/sale.model';
import { Operation } from '@/models/operation.enum';
import { generateId } from '@/utils/functions.util';
import { SaleUpdateDto } from './dto/sale-update.dto';

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
            saleItemSizes: {
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

  updateSale(id: number, dto: SaleUpdateDto): Promise<Sale> {
    return this.prisma.sale.update({
      where: { id },
      data: {
        saleNo: dto.saleNo,
        date: dto.date,
        updatedBy: dto.updatedBy,
        saleItems: {
          deleteMany: {},
          create: dto.saleItems.map((item) => ({
            invProduct: {
              connect: {
                invId_productId: {
                  invId: item.invId,
                  productId: item.productId,
                },
              },
            },
            saleItemSizes: {
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

  getSales(): Promise<Sale[]> {
    return this.prisma.sale.findMany({
      include: {
        saleItems: {
          include: {
            saleItemSizes: { include: { size: true } },
          },
        },
      },
    });
  }

  async getSale(id: number): Promise<Sale> {
    const sale = await this.prisma.sale.findUnique({
      where: { id },
      include: {
        saleItems: {
          include: {
            saleItemSizes: { include: { size: true } },
          },
        },
      },
    });

    if (!sale) {
      throw new Error(`Sale with ID ${id} not found.`);
    }

    return sale;
  }

  async generateSaleNo(): Promise<string> {
    const lastSale = await this.prisma.sale.findFirst({
      orderBy: { createdAt: 'desc' },
    });
    const lastSaleNo = lastSale?.saleNo;

    return generateId(Operation.Sale, lastSaleNo);
  }

  async deleteSale(id: number): Promise<Boolean> {
    await this.prisma.sale.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
