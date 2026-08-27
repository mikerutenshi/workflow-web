import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCategoryService } from './product-category.service';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductCategoryCreateDto } from './dto/product-category-create.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';

@Resolver(() => ProductCategory)
export class ProductCategoryResolver {
  constructor(private productCategoryService: ProductCategoryService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => ProductCategory)
  createProductCategory(
    @Args('data') data: ProductCategoryCreateDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.createProductCategory(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => ProductCategory)
  updateProductCategory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ProductCategoryCreateDto,
  ): Promise<ProductCategory> {
    return this.productCategoryService.updateProductCategory(id, data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [ProductCategory])
  getProductCategories() {
    return this.productCategoryService.getProductCategories();
  }

  @UseGuards(AuthGuard)
  @Query(() => ProductCategory)
  getProductCategory(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.productCategoryService.getProductCategory(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  deleteProductCategory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.productCategoryService.deleteProductCategory(id);
  }
}
