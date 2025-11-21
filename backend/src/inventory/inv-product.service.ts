import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InvProductCreateDto } from './dto/inv-product-create.dto';
import { InvProduct } from '@/models/inv-product.model';
import { Prisma, Progress } from '@/generated/client';
import { InvProductUpdateDto } from './dto/inv-product-update.dto';
import { InvProductDto } from './dto/inv-product.dto';

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
          },
        },
      });

      return {
        ...createdProduct,
        discount: createdProduct.discount?.toString(),
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
        },
        invTrfItems: {
          include: {
            invTrfItemSizes: { include: { size: true } },
          },
          where: {
            progress: { not: Progress.COMPLETED },
          },
        },
      },
      where: {
        invId,
      },
    });

    return products.map((product) => ({
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
      discount: product.discount?.toString(),
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
        },
      },
    });

    return {
      ...invProduct,
      discount: invProduct.discount?.toString(),
    } as InvProduct;
  }

  upsertInvProduct(data: InvProductCreateDto): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;

    return this.prisma.$transaction(async (tx) => {
      const upsertProduct = await tx.invToProduct.upsert({
        where: {
          invId_productId: { invId: data.invId, productId: data.productId },
        },
        update: rest,
        create: rest,
      });

      if (invProductSizes && invProductSizes.length > 0) {
        invProductSizes.map(async (productSize) => {
          await tx.invProductToSize.upsert({
            where: {
              invId_productId_sizeId: {
                invId: upsertProduct.invId,
                productId: upsertProduct.productId,
                sizeId: productSize.sizeId,
              },
            },
            update: { quantity: { increment: productSize.quantity } },
            create: {
              invId: upsertProduct.invId,
              productId: upsertProduct.productId,
              sizeId: productSize.sizeId,
              quantity: productSize.quantity,
            },
          });
        });
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
          },
        },
      });
      console.log(`Result: ${JSON.stringify(result)}`);
      return {
        ...result,
        discount: result?.discount?.toString(),
      } as InvProduct;
    });
  }

  decrementInvProduct(invProduct: {
    invId: number;
    productId: number;
    invProductSizes: {
      sizeId: number;
      quantity: number;
    }[];
  }): Promise<Boolean> {
    return this.prisma.$transaction(async (tx) => {
      for (const size of invProduct.invProductSizes) {
        const result = await tx.invProductToSize.update({
          where: {
            invId_productId_sizeId: {
              invId: invProduct.invId,
              productId: invProduct.productId,
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
                invId: invProduct.invId,
                productId: invProduct.productId,
                sizeId: size.sizeId,
              },
            },
          });
        }
      }

      const finalProduct = await tx.invToProduct.findUniqueOrThrow({
        where: {
          invId_productId: {
            invId: invProduct.invId,
            productId: invProduct.productId,
          },
        },
        include: {
          invProductSizes: {
            include: {
              size: true,
            },
          },
        },
      });

      const finalSum = finalProduct.invProductSizes.reduce(
        (sum, size) => sum + size.quantity,
        0,
      );

      if (finalSum === 0) {
        await tx.invToProduct.delete({
          where: {
            invId_productId: {
              invId: invProduct.invId,
              productId: invProduct.productId,
            },
          },
        });
      }

      return true;
    });
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
}
