import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { ProductDto } from './dto/product.dto';
import { ProductGroupDto } from './dto/productGroup.dto';
import { ProductCategoryDto } from './dto/productCategory.dto';
import { LabourCostDto } from './dto/labourCost.dto';
import { ProductCategory } from '@/models/product-category.model ';
import { Product } from '@/models/product.model';
import { ProductGroup } from '@/models/product-group.model';
import { LabourCost } from '@/models/labour-cost.model';

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

  async createProduct(data: ProductDto): Promise<Product> {
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
              order,
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

  async getProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany({
      include: {
        productGroup: true,
        productColors: {
          include: {
            color: true,
          },
        },
      },
    });
  }
}
