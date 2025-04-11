import { ProductGroup } from '@/models/product-group.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductGroupDto } from './dto/createProductGroup.dto';
import { GetProductGroupsDto } from './dto/getProductGroup.dto';
import { ProductGroupService } from './productGroup.service';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => ProductGroup)
export class ProductGroupResolver {
  constructor(private productGroupService: ProductGroupService) {}

  @Mutation(() => ProductGroup)
  createProductGroup(
    @Args('data') data: CreateProductGroupDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(data);
  }
  @Mutation(() => ProductGroup)
  updateProductGroup(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: CreateProductGroupDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.updateProductGroup(id, data);
  }

  // @UseGuards(AuthGuard)
  @Query(() => [GetProductGroupsDto])
  getProductGroups() {
    return this.productGroupService.getProductGroups();
  }

  @Query(() => GetProductGroupsDto)
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
