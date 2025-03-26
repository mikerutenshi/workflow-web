import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Product } from '@/models/product.model';
import { GetProductsDto } from './dto/getProducts.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

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

  async createProduct(data: CreateProductDto): Promise<Product> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        const newProduct = await tx.product.create({
          data: {
            sku: data.sku,
            productGroupId: data.productGroupId,
            createdBy: data.createdBy,
          },
        });
        const productId = newProduct.id;

        for (const colorId of data.colorIds) {
          let order = 1;
          await tx.productColors.create({
            data: {
              productId,
              colorId,
              order: order++,
            },
          });
        }

        const resultProduct = await tx.product.findUnique({
          where: {
            id: productId,
          },
          include: {
            productGroup: true,
            productColors: {
              include: {
                color: true,
              },
            },
          },
        });

        if (!resultProduct) {
          throw new Error(
            `Product with ID ${productId} not found after creation.`,
          );
        }

        return resultProduct;
      });
    } catch (error) {
      console.error('Error creating Product and ProductColors: ', error);
      throw error;
    }
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
        },
      },
    });
  }

  async deleteProduct(id: number): Promise<Boolean> {
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    return true;
  }

  async updateProduct(
    id: number,
    data: UpdateProductDto,
  ): Promise<GetProductsDto> {
    try {
      return await this.prisma.$transaction(async (tx) => {
        await tx.product.update({
          where: {
            id: id,
          },
          data: {
            sku: data.sku,
            productGroupId: data.productGroupId,
            updatedBy: data.updatedBy,
          },
        });

        if (data.colorIds && data.colorIds.length > 0) {
          await tx.productColors.deleteMany({
            where: {
              productId: id,
            },
          });

          let order = 1;
          for (const colorId of data.colorIds) {
            await tx.productColors.create({
              data: {
                productId: id,
                colorId,
                order: order++,
              },
            });
          }
        }

        const result = await tx.product.findUnique({
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
            },
          },
        });

        if (!result) {
          throw new Error(`Product with ID ${id} not found.`);
        }

        return result;
      });
    } catch (error) {
      console.error('Error updating Product and ProductColors: ', error);
      throw error;
    }
  }
}
