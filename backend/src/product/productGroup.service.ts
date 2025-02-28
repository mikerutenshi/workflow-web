import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ProductGroupDto } from './dto/productGroup.dto';
import { GetProductGroup, ProductGroup } from '@/models/product-group.model';
import { ProductCategory } from '@/models/product-category.model ';

@Injectable()
export class ProductGroupService {
  constructor(private prisma: PrismaService) {}

  async createProductGroup(data: ProductGroupDto): Promise<ProductGroup> {
    return await this.prisma.productGroup.create({
      data: {
        skuNumeric: data.skuNumeric,
        productCategoryId: data.productCategoryId,
        name: data.name,
      },
    });
  }

  async getProductGroups(): Promise<GetProductGroup[]> {
    return await this.prisma.productGroup.findMany({
      include: {
        productCategory: true,
        products: {
          include: {
            productGroup: true,
            productColors: {
              include: {
                color: true,
              },
            },
          },
        },
        labourCost: {
          include: {
            productGroup: true,
          },
        },
      },
    });
  }
}
