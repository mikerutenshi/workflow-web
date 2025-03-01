import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ProductGroupService } from './productGroup.service';
import { ProductGroupDto } from './dto/productGroup.dto';
import { GetProductGroup, ProductGroup } from '@/models/product-group.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';

@Resolver(() => ProductGroup)
export class ProductGroupResolver {
  constructor(private productGroupService: ProductGroupService) {}

  @Mutation(() => ProductGroup)
  createProductGroup(
    @Args('data') data: ProductGroupDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(data);
  }

  // @UseGuards(AuthGuard)
  @Query(() => [GetProductGroup])
  getPrdouctGroups() {
    return this.productGroupService.getProductGroups();
  }
}
