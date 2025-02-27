import { Injectable } from '@nestjs/common';
import { ProductCategoryDto } from './dto/productCategory.dto';
import { ProductCategory } from '@/models/product-category.model ';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async createProductCategory(
    data: ProductCategoryDto,
  ): Promise<ProductCategory> {
    return await this.prisma.productCategory.create({
      data: {
        name: data.name,
        gender: data.gender,
      },
    });
  }

  async getProductCategories(): Promise<ProductCategory[]> {
    return await this.prisma.productCategory.findMany();
  }
}
