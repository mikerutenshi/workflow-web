import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from '@/models/product.model';
import { GetProductsDto } from './dto/getProducts.dto';

// type NullToUndefined<T> = {
//   [K in keyof T]: T[K] extends null
//     ? undefined
//     : T[K] extends (infer U)[]
//       ? NullToUndefined<U>[] // Handle arrays recursively
//       : T[K] extends object
//         ? NullToUndefined<T[K]> // Handle nested objects recursively
//         : T[K];
// };

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  createProduct(data: CreateProductDto): Promise<Product> {
    let order = 1;
    return this.prisma.product.create({
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
  }

  async getProducts(): Promise<GetProductsDto[]> {
    return await this.prisma.product.findMany({
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
  }

  async getProduct(id: number): Promise<GetProductsDto> {
    const result = await this.prisma.product.findUnique({
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
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    return true;
  }

  updateProduct(id: number, data: CreateProductDto): Promise<Product> {
    let order = 1;
    return this.prisma.product.update({
      where: { id },
      data: {
        sku: data.sku,
        productGroupId: data.productGroupId,
        createdBy: data.createdBy,
        productColors: {
          deleteMany: { productId: id },
          create: data.colorIds.map((colorId) => ({
            color: { connect: { id: colorId } },
            order: order++,
          })),
        },
      },
    });
  }
}
