import { ProductGroup } from '@/models/product-group.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductGroupDto } from './dto/createProductGroup.dto';
import { ProductGroupService } from './productGroup.service';
import { GetProductGroupsDto } from './dto/getProductGroup.dto';

@Resolver(() => ProductGroup)
export class ProductGroupResolver {
  constructor(private productGroupService: ProductGroupService) {}

  @Mutation(() => ProductGroup)
  createProductGroup(
    @Args('data') data: CreateProductGroupDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(data);
  }

  // @UseGuards(AuthGuard)
  @Query(() => [GetProductGroupsDto])
  getProductGroups() {
    return this.productGroupService.getProductGroups();
  }
}
