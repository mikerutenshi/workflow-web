import { ProductGroup } from '@/models/product-group.model';
import { Inject, Injectable } from '@nestjs/common';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';
import { PrismaClient } from '@/generated/prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductGroupService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  async createProductGroup(data: ProductGroupCreateDto): Promise<ProductGroup> {
    return await this.prisma.client.productGroup.create({
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
    return this.prisma.client.productGroup.update({ where: { id }, data });
  }

  async getProductGroups(): Promise<ProductGroupGetDto[]> {
    return await this.prisma.client.productGroup.findMany({
      include: {
        productCategory: true,
      },
    });
  }

  async getProductGroup(id: number): Promise<ProductGroupGetDto> {
    const result = await this.prisma.client.productGroup.findUnique({
      where: {
        id: id,
      },
      include: {
        productCategory: true,
      },
    });

    if (!result) {
      throw new Error(`Product group with ID ${id} not found.`);
    }
    return result;
  }

  async deleteProductGroup(id: number): Promise<Boolean> {
    const productGroup = await this.prisma.client.productGroup.delete({
      where: { id },
    });

    if (!productGroup)
      throw Error(`Delete product group with ID ${id} failed.`);

    return true;
  }
}
