import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/createProductCategory.dto';
import { ProductCategory } from '@/models/product-category.model ';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async createProductCategory(
    data: CreateProductCategoryDto,
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

  async getProductCategory(
    productCategoryId: number,
  ): Promise<ProductCategory> {
    const category = await this.prisma.productCategory.findFirst({
      where: {
        id: productCategoryId,
      },
    });
    console.log(`category: ${JSON.stringify(category)}`);
    if (!category) {
      throw new Error('Product category not found');
    }
    return category;
  }
}
