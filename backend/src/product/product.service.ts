import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductCreateDto } from './dto/product-create.dto';
import { Product } from '@/models/product.model';
import { ProductGetDto } from './dto/product-get.dto';

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

  createProduct(data: ProductCreateDto): Promise<Product> {
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

  async getProducts(): Promise<ProductGetDto[]> {
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

  async getProduct(id: number): Promise<ProductGetDto> {
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

  updateProduct(id: number, data: ProductCreateDto): Promise<Product> {
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
