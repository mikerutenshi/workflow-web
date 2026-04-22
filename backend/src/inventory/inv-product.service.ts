import { Gender, Prisma, Progress } from '@/generated/prisma/client';
import { InvProduct } from '@/models/inv-product.model';
import { PrismaService } from '@/prisma/prisma.service';
import { calculatePrice } from '@/utils/functions.util';
import { Injectable } from '@nestjs/common';
import { InvProductCreateDto } from './dto/inv-product-create.dto';
import { InvProductUpdateDto } from './dto/inv-product-update.dto';
import { InvProductDto } from './dto/inv-product.dto';
import { CsvUploadDto } from '@/file/dto/csv-upload.dto';
import { InvProductUploadDto } from './dto/inv-product-upload.dto';
import { parse } from 'fast-csv';

@Injectable()
export class InvProductService {
  constructor(private prisma: PrismaService) {}

  async createInvProduct(data: InvProductCreateDto): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;
    try {
      const createdProduct = await this.prisma.invToProduct.create({
        data: {
          ...rest,
          invProductSizes: {
            create: invProductSizes,
          },
        },
        include: {
          invProductSizes: {
            include: { size: true },
            orderBy: [{ sizeId: 'asc' }],
          },
        },
      });

      return {
        ...createdProduct,
        discount: createdProduct.discount?.toFixed(2),
      } as InvProduct;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Duplicate entry for Product.');
      }
      throw error;
    }
  }
  async getInvProducts(invId: number): Promise<InvProductDto[]> {
    const products = await this.prisma.invToProduct.findMany({
      include: {
        product: {
          include: {
            productGroup: { include: { productCategory: true } },
            productColors: { include: { color: true } },
          },
        },
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
        invTrfItems: {
          include: {
            invTrfItemSizes: {
              include: { size: true },
              orderBy: [{ sizeId: 'asc' }],
            },
          },
          where: {
            progress: { not: Progress.COMPLETED },
          },
        },
        inventory: {
          select: {
            priceFormula: {
              select: { offset: true, multiplier: true, discounts: true },
            },
          },
        },
      },
      where: {
        invId,
      },
    });

    return products.map(({ inventory, ...product }) => ({
      ...product,
      invProductSizes: product.invProductSizes
        .map((productSize) => {
          const pendingQty = product.invTrfItems.reduce(
            (sum, i) =>
              sum +
              i.invTrfItemSizes.reduce(
                (s, i) =>
                  i.size.id === productSize.size.id ? s + i.quantity : s,
                0,
              ),
            0,
          );

          const finalQty = productSize.quantity - pendingQty;

          return {
            ...productSize,
            quantity: finalQty,
          };
        })
        .filter((size) => size.quantity > 0),
      discount: product.discount?.toFixed(2),
      price: calculatePrice(
        product.product.productGroup.msrp,
        inventory.priceFormula?.offset,
        inventory.priceFormula?.multiplier,
        inventory.priceFormula?.discounts,
      ),
    })) as InvProductDto[];
  }

  async updateInvProduct(
    invId: number,
    productId: number,
    data: InvProductUpdateDto,
  ): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;
    const invProduct = await this.prisma.invToProduct.update({
      where: { invId_productId: { invId, productId } },
      data: {
        ...rest,
        ...(invProductSizes && {
          invProductSizes: {
            deleteMany: {}, // Remove existing sizes
            create: invProductSizes, // Add new sizes
          },
        }),
      },
      include: {
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
      },
    });

    return {
      ...invProduct,
      discount: invProduct.discount?.toFixed(2),
    } as InvProduct;
  }

  async upsertInvProductOp(
    data: InvProductCreateDto,
    tx: Prisma.TransactionClient,
  ): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;

    const upsertProduct = await tx.invToProduct.upsert({
      where: {
        invId_productId: { invId: data.invId, productId: data.productId },
      },
      update: rest,
      create: rest,
    });

    if (invProductSizes && invProductSizes.length > 0) {
      await this.incrementInvProductOp(
        rest.invId,
        rest.productId,
        invProductSizes,
        tx,
      );
    }

    const result = await tx.invToProduct.findUnique({
      where: {
        invId_productId: {
          invId: upsertProduct.invId,
          productId: upsertProduct.productId,
        },
      },
      include: {
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
      },
    });
    // console.log(`Result: ${JSON.stringify(result)}`);
    return {
      ...result,
      discount: result?.discount?.toFixed(2),
    } as InvProduct;
  }

  decrementInvProduct(
    invId: number,
    productId: number,
    invProductSizes: {
      sizeId: number;
      quantity: number;
    }[],
  ): Promise<Boolean> {
    return this.prisma.$transaction(async (tx) => {
      await this.decrementInvProductOp(invId, productId, invProductSizes, tx);
      return true;
    });
  }

  async decrementInvProductOp(
    invId: number,
    productId: number,
    invProductSizes: {
      sizeId: number;
      quantity: number;
    }[],
    tx: Prisma.TransactionClient,
  ) {
    await Promise.all(
      invProductSizes.map(async (size) => {
        const result = await tx.invProductToSize.update({
          where: {
            invId_productId_sizeId: {
              invId,
              productId,
              sizeId: size.sizeId,
            },
          },
          data: {
            quantity: { decrement: size.quantity },
          },
        });
        if (result.quantity === 0) {
          await tx.invProductToSize.delete({
            where: {
              invId_productId_sizeId: {
                invId,
                productId,
                sizeId: size.sizeId,
              },
            },
          });
        }
      }),
    );
  }

  async incrementInvProductOp(
    invId: number,
    productId: number,
    invProductSizes: {
      sizeId: number;
      quantity: number;
    }[],
    tx: Prisma.TransactionClient,
  ) {
    await Promise.all(
      invProductSizes.map(async (size) => {
        await tx.invProductToSize.upsert({
          where: {
            invId_productId_sizeId: {
              invId: invId,
              productId: productId,
              sizeId: size.sizeId,
            },
          },
          update: { quantity: { increment: size.quantity } },
          create: {
            invId: invId,
            productId: productId,
            sizeId: size.sizeId,
            quantity: size.quantity,
          },
        });
      }),
    );
  }

  async deleteInvProduct(invId: number, productId: number): Promise<Boolean> {
    const invProduct = await this.prisma.invToProduct.delete({
      where: { invId_productId: { invId, productId } },
    });
    if (!invProduct) {
      throw new Error(
        `Delete invProduct with invId ${invId}, productId ${productId} failed.`,
      );
    }

    return true;
  }

  async uploadInvProducts(data: CsvUploadDto): Promise<boolean> {
    try {
      if (!data.csvFile) {
        throw new Error('No file provided');
      }

      const { createReadStream } = await data.csvFile;
      const rows: InvProductUploadDto[] = [];

      await new Promise<void>((resolve, reject) => {
        createReadStream()
          .pipe(parse({ headers: true }))
          .on('error', reject)
          .on('data', (row) => rows.push(row))
          .on('end', () => resolve());
      });

      const sizes = await this.prisma.size.findMany({
        where: { gender: Gender.MEN },
      });

      const nums: string[] = ['38', '39', '40', '41', '42', '43', '44', '45'];

      for (const row of rows) {
        const product: InvProductCreateDto = {
          invId: Number(row.invId),
          productId: Number(row.productId),
          discount: row.discount,
          invProductSizes: [],
        };

        nums.forEach((num) => {
          const col = 'qty' + num;
          const qty = (row as any)[col];

          if (qty && Number(qty) > 0) {
            const size = sizes.find((size) => size.eu == num);
            if (size) {
              product.invProductSizes.push({
                sizeId: size.id,
                quantity: Number(qty),
              });
            }
          }
        });

        const { invProductSizes, ...rest } = product;

        await this.prisma.invToProduct.create({
          data: {
            ...rest,
            invProductSizes: {
              create: invProductSizes,
            },
          },
        });
      }

      return true;
    } catch (error) {
      throw error;
    }
  }
}
