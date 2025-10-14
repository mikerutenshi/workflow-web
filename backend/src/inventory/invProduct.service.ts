import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InvProductCreateDto } from './dto/inv-product-create.dto';
import { InvProduct } from '@/models/inv-product.model';
import { Prisma } from '@/generated/client';
import { InvProductUpdateDto } from './dto/inv-product-update.dto';
import { InvProductDto } from './dto/inv-product.dto';

@Injectable()
export class InvProductService {
  constructor(private prisma: PrismaService) {}

  async createInvProduct(data: InvProductCreateDto): Promise<InvProduct> {
    const { invProductSizes, discount, ...rest } = data;
    try {
      const createdProduct = await this.prisma.invToProduct.create({
        data: {
          ...rest,
          discount: Prisma.Decimal(discount),
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
        discount: Prisma.Decimal(createdProduct.discount).toString(),
      } as InvProduct;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new Error('Duplicate entry for Product.');
      }
      throw error;
    }
  }
  async getInvProducts(): Promise<InvProductDto[]> {
    const products = await this.prisma.invToProduct.findMany({
      include: {
        invProductSizes: {
          include: { size: true },
        },
        product: {
          include: {
            productGroup: { include: { productCategory: true } },
            productColors: { include: { color: true } },
          },
        },
      },
    });

    return products.map((product) => ({
      ...product,
      discount: Prisma.Decimal(product.discount).toString(),
    })) as InvProductDto[];
  }

  async updateInvProduct(
    invId: number,
    productId: number,
    data: InvProductUpdateDto,
  ): Promise<InvProduct> {
    const { invProductSizes, discount, ...rest } = data;
    const updatedProduct = await this.prisma.invToProduct.update({
      where: { invId_productId: { invId, productId } },
      data: {
        ...rest,
        ...(discount !== undefined && { discount: Prisma.Decimal(discount) }),
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
      ...updatedProduct,
      discount: Prisma.Decimal(updatedProduct.discount).toString(),
    } as InvProduct;
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
