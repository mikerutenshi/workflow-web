import { ProductGroup } from '@/models/product-group.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateProductGroupDto } from './dto/createProductGroup.dto';
import { GetProductGroupsDto } from './dto/getProductGroup.dto';

@Injectable()
export class ProductGroupService {
  constructor(private prisma: PrismaService) {}

  async createProductGroup(data: CreateProductGroupDto): Promise<ProductGroup> {
    return await this.prisma.productGroup.create({
      data: {
        skuNumeric: data.skuNumeric,
        productCategoryId: +data.productCategoryId,
        name: data.name,
      },
    });
  }

  async getProductGroups(): Promise<GetProductGroupsDto[]> {
    return await this.prisma.productGroup.findMany({
      include: {
        productCategory: true,
        products: {
          include: {
            productColors: { include: { color: true } },
          },
        },
        laborCost: true,
      },
    });
  }

  async getProductGroup(id: string): Promise<GetProductGroupsDto> {
    const result = await this.prisma.productGroup.findUnique({
      where: {
        id: +id,
      },
      include: {
        productCategory: true,
        products: {
          include: {
            productColors: { include: { color: true } },
          },
        },
        laborCost: true,
      },
    });

    if (!result) {
      throw new Error(`Product group with ID ${id} not found.`);
    }
    return result;
  }
}
