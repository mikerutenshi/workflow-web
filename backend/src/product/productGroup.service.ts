import { ProductGroup } from '@/models/product-group.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';

@Injectable()
export class ProductGroupService {
  constructor(private prisma: PrismaService) {}

  async createProductGroup(data: ProductGroupCreateDto): Promise<ProductGroup> {
    return await this.prisma.productGroup.create({
      data: {
        skuNumeric: data.skuNumeric,
        productCategoryId: data.productCategoryId,
        name: data.name,
        createdBy: data.createdBy,
      },
    });
  }

  updateProductGroup(
    id: number,
    data: ProductGroupCreateDto,
  ): Promise<ProductGroup> {
    return this.prisma.productGroup.update({ where: { id }, data });
  }

  async getProductGroups(): Promise<ProductGroupGetDto[]> {
    return await this.prisma.productGroup.findMany({
      include: {
        productCategory: true,
        products: {
          include: {
            productColors: { include: { color: true } },
          },
        },
        laborCosts: true,
      },
    });
  }

  async getProductGroup(id: number): Promise<ProductGroupGetDto> {
    const result = await this.prisma.productGroup.findUnique({
      where: {
        id: id,
      },
      include: {
        productCategory: true,
        products: {
          include: {
            productColors: { include: { color: true } },
          },
        },
        laborCosts: true,
      },
    });

    if (!result) {
      throw new Error(`Product group with ID ${id} not found.`);
    }
    return result;
  }

  async deleteProductGroup(id: number): Promise<Boolean> {
    const productGroup = await this.prisma.productGroup.delete({
      where: { id },
    });

    if (!productGroup)
      throw Error(`Delete product group with ID ${id} failed.`);

    return true;
  }
}
