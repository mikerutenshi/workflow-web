import { TxType } from '@/generated/prisma/client';
import { InvProductService } from '@/inventory/inv-product.service';
import { InvTxService } from '@/inventory/inv-tx.service';
import { Operation } from '@/models/operation.enum';
import { Sale } from '@/models/sale.model';
import { PrismaService } from '@/prisma/prisma.service';
import { generateId } from '@/utils/functions.util';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';

import { SaleCreateDto } from './dto/sale-create.dto';
import { SaleUpdateDto } from './dto/sale-update.dto';

@Injectable()
export class SaleService {
  constructor(
    private prisma: PrismaService,
    private invProductService: InvProductService,
    private invTxService: InvTxService,
  ) {}

  async createSale(data: SaleCreateDto): Promise<Sale> {
    const txResult = this.prisma.$transaction(async (tx) => {
      const saleResult = await tx.sale.create({
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
              saleItemSizes: {
                include: { size: true },
                orderBy: [{ sizeId: 'asc' }],
              },
            },
          },
        },
      });

      await Promise.all(
        data.saleItems.map(async (item) => {
          await this.invProductService.decrementInvProductOp(
            item.invId,
            item.productId,
            item.saleItemSizes,
            tx,
          );

          await this.invTxService.createInvTxOp(
            {
              invId: item.invId,
              productId: item.productId,
              txNo: saleResult.saleNo,
              type: TxType.SALE,
              saleId: saleResult.id,
              createdBy: data.createdBy,
              invTxSizes: item.saleItemSizes.map((size) => ({
                sizeId: size.sizeId,
                quantity: -size.quantity,
              })),
            },
            tx,
          );
        }),
      );

      return saleResult;
    });

    return txResult;
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
            saleItemSizes: {
              include: { size: true },
              orderBy: [{ sizeId: 'asc' }],
            },
          },
        },
      },
    });
  }

  async deleteSale(id: number): Promise<Boolean> {
    this.prisma.$transaction(async (tx) => {
      // const saleItems = await tx.saleItem.findMany({
      //   where: { saleId: id },
      //   include: { saleItemSizes: true },
      // });

      const sale = await tx.sale.findUnique({
        where: { id },
        include: {
          saleItems: {
            include: {
              saleItemSizes: {
                include: { size: true },
                orderBy: [{ sizeId: 'asc' }],
              },
            },
          },
        },
      });

      if (sale) {
        await Promise.all(
          sale.saleItems.map(async (item) => {
            await this.invProductService.incrementInvProductOp(
              item.invId,
              item.productId,
              item.saleItemSizes,
              tx,
            );
            await this.invTxService.createInvTxOp(
              {
                invId: item.invId,
                productId: item.productId,
                txNo: sale.saleNo,
                type: TxType.REVERSION,
                createdBy: sale.createdBy,
                invTxSizes: item.saleItemSizes.map((size) => ({
                  sizeId: size.sizeId,
                  quantity: size.quantity,
                })),
              },
              tx,
            );
          }),
        );

        await tx.sale.delete({
          where: {
            id: id,
          },
        });
      }
    });
    return true;
  }

  getSales(invId?: number): Promise<Sale[]> {
    return this.prisma.sale.findMany({
      where: {
        saleItems: {
          some: {
            invId,
          },
        },
      },
      include: {
        saleItems: {
          include: {
            saleItemSizes: {
              include: { size: true },
              orderBy: [{ sizeId: 'asc' }],
            },
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
            saleItemSizes: {
              include: { size: true },
              orderBy: [{ sizeId: 'asc' }],
            },
          },
        },
      },
    });

    if (!sale) {
      throw new Error(`Sale with ID ${id} not found.`);
    }

    return sale;
  }

  async generateSaleNo(date: Date): Promise<string> {
    const oneDayMore = dayjs(date).add(1, 'day').toDate();

    const lastSale = await this.prisma.sale.findFirst({
      orderBy: { saleNo: 'desc' },
      where: {
        date: {
          gte: date,
          lt: oneDayMore,
        },
      },
    });
    const lastSaleNo = lastSale?.saleNo;

    return generateId(Operation.Sale, lastSaleNo, date);
  }
}
