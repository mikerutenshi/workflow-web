import { Inject, Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from '@/models/product.model';
import { ProductDto } from './dto/product.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaClient } from '@/generated/prisma/client';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  createProduct(data: ProductCreateDto): Promise<Product> {
    let order = 1;
    return this.prisma.client.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          sku: data.sku,
          productGroupId: data.productGroupId,
          createdBy: data.createdBy,
          productColors: {
            create: data.colorIds.map((colorId) => ({
              color: { connect: { id: colorId } },
              order: order++,
            })),
          },
        },
      });

      await tx.productGroup.update({
        where: { id: data.productGroupId },
        data: {
          msrp: data.msrp,
        },
      });

      return product;
    });
  }

  updateProduct(id: number, data: ProductUpdateDto): Promise<Product> {
    let order = 1;
    return this.prisma.client.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          sku: data.sku,
          productGroupId: data.productGroupId,
          productColors: {
            deleteMany: { productId: id },
            create: data.colorIds?.map((colorId) => ({
              color: { connect: { id: colorId } },
              order: order++,
            })),
          },
        },
      });

      await tx.productGroup.update({
        where: { id: data.productGroupId },
        data: {
          msrp: data.msrp,
        },
      });

      return product;
    });
  }

  async getProducts(): Promise<ProductDto[]> {
    return await this.prisma.client.product.findMany({
      include: {
        productGroup: {
          include: {
            productCategory: true,
          },
        },
        productColors: {
          include: {
            color: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: [{ productGroup: { skuNumeric: 'asc' } }, { sku: 'asc' }],
    });
  }

  async getProduct(id: number): Promise<ProductDto> {
    const result = await this.prisma.client.product.findUnique({
      where: {
        id: id,
      },
      include: {
        productGroup: {
          include: {
            productCategory: true,
          },
        },
        productColors: {
          include: {
            color: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!result) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return result;
  }

  async deleteProduct(id: number): Promise<Boolean> {
    await this.prisma.client.product.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
