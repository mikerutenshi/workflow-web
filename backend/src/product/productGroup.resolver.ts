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

@Resolver(() => ProductGroup)
export class ProductGroupResolver {
  constructor(private productGroupService: ProductGroupService) {}

  @Mutation(() => ProductGroup)
  createProductGroup(
    @Args('data') data: ProductGroupDto,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(data);
  }

  @Query(() => [GetProductGroup])
  getPrdouctGroups() {
    return this.productGroupService.getProductGroups();
  }
}
