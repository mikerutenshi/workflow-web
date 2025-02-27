import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ProductGroupDto } from './dto/productGroup.dto';
import { ProductGroup } from '@/models/product-group.model';

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

  async getProductGroups(): Promise<ProductGroup[]> {
    return await this.prisma.productGroup.findMany();
  }
}
