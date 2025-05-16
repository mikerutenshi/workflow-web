import { ProductGroup } from '@/models/product-group.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';
import { ProductGroupService } from './productGroup.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => ProductGroup)
export class ProductGroupResolver {
  constructor(private productGroupService: ProductGroupService) {}

  @Mutation(() => ProductGroup)
  createProductGroup(
    @Args('data') data: ProductGroupCreateDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(data);
  }
  @Mutation(() => ProductGroup)
  updateProductGroup(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ProductGroupCreateDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.updateProductGroup(id, data);
  }

  @Query(() => [ProductGroupGetDto])
  getProductGroups() {
    return this.productGroupService.getProductGroups();
  }

  @Query(() => ProductGroupGetDto)
  getProductGroup(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.productGroupService.getProductGroup(id);
  }

  @Mutation(() => Boolean)
  deleteProductGroup(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.productGroupService.deleteProductGroup(id);
  }
}
