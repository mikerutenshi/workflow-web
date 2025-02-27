import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductGroupService } from './productGroup.service';
import { ProductGroupDto } from './dto/productGroup.dto';
import { ProductGroup } from '@/models/product-group.model';

@Resolver(() => ProductGroup)
export class ProductGroupResolver {
  constructor(private productGroupService: ProductGroupService) {}

  @Mutation(() => ProductGroup)
  createProductGroup(
    @Args('data') data: ProductGroupDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(data);
  }

  @Query(() => ProductGroup)
  getPrdouctGroups() {
    return this.productGroupService.getProductGroups();
  }
}
