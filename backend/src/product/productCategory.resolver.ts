import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductCategoryCreateDto } from './dto/product-category-create.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('data') data: ProductCategoryCreateDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createProductCategory(data);
  }

  @Mutation(() => ProductCategory)
  updateProductCategory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ProductCategoryCreateDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.updateProductCategory(id, data);
  }

  @Query(() => [ProductCategory])
  getProductCategories() {
    return this.productCategoryService.getProductCategories();
  }

  @Query(() => ProductCategory)
  getProductCategory(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.productCategoryService.getProductCategory(id);
  }

  @Mutation(() => Boolean)
  deleteProductCategory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.productCategoryService.deleteProductCategory(id);
  }
}
