import { Prisma, PrismaClient, Progress } from '@/generated/client';
import { InvProduct } from '@/models/inv-product.model';
import { calculatePrice } from '@/utils/functions.util';
import { Inject, Injectable } from '@nestjs/common';
import { InvProductCreateDto } from './dto/inv-product-create.dto';
import { InvProductUpdateDto } from './dto/inv-product-update.dto';
import { InvProductDto } from './dto/inv-product.dto';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class InvProductService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  async createInvProduct(data: InvProductCreateDto): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;
    try {
      const createdProduct = await this.prisma.client.invToProduct.create({
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
    const products = await this.prisma.client.invToProduct.findMany({
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
    const invProduct = await this.prisma.client.invToProduct.update({
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
    return this.prisma.client.$transaction(async (tx) => {
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
    const invProduct = await this.prisma.client.invToProduct.delete({
      where: { invId_productId: { invId, productId } },
    });
    if (!invProduct) {
      throw new Error(
        `Delete invProduct with invId ${invId}, productId ${productId} failed.`,
      );
    }

    return true;
  }
}
