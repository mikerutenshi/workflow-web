import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductCategoryDto } from './dto/productCategory.dto';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('data') data: ProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createProductCategory(data);
  }

  @Query(() => [ProductCategory])
  getProductCategories() {
    return this.productCategoryService.getProductCategories();
  }
}
