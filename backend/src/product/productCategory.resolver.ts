import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './productCategory.service';
import { ProductCategory } from '@/models/product-category.model ';
import { CreateProductCategoryDto } from './dto/createProductCategory.dto';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private productCategoryService: ProductCategoryService) {}

  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('data') data: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createProductCategory(data);
  }

  @Query(() => [ProductCategory])
  getProductCategories() {
    return this.productCategoryService.getProductCategories();
  }
}
