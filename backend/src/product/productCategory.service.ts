import { Injectable } from '@nestjs/common';
import { ProductCategoryCreateDto } from './dto/product-category-create.dto';
import { ProductCategory } from '@/models/product-category.model ';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class ProductCategoryService {
  constructor(private prisma: PrismaService) {}

  async createProductCategory(
    data: ProductCategoryCreateDto,
  ): Promise<ProductCategory> {
    return await this.prisma.productCategory.create({
      data: {
        name: data.name,
        gender: data.gender,
      },
    });
  }
  updateProductCategory(
    id: number,
    data: ProductCategoryCreateDto,
  ): Promise<ProductCategory> {
    return this.prisma.productCategory.update({ where: { id }, data });
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

  async deleteProductCategory(id: number): Promise<Boolean> {
    const productCategory = await this.prisma.productGroup.delete({
      where: { id },
    });

    if (!productCategory)
      throw Error(`Delete product category with ID ${id} failed.`);

    return true;
  }
}
