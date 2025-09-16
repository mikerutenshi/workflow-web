import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvProductService } from './invProduct.service';
import { InvProduct } from '@/models/inv-product.model';
import { InvProductCreateDto } from './dto/inv-product-create.dto';
import { ParseIntPipe } from '@nestjs/common';
import { InvProductUpdateDto } from './dto/inv-product-update.dto';
import { InvProductGetDto } from './dto/inv-product-get.dto';

@Resolver(() => InvProduct)
export class InvProductResolver {
  constructor(private service: InvProductService) {}

  @Mutation(() => InvProduct)
  createInvProduct(
    @Args('data') data: InvProductCreateDto,
  ): Promise<InvProduct> {
    return this.service.createInvProduct(data);
  }

  @Query(() => [InvProductGetDto])
  getInvProducts(): Promise<InvProductGetDto[]> {
    return this.service.getInvProducts();
  }

  @Mutation(() => InvProduct)
  updateInvProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: InvProductUpdateDto,
  ): Promise<InvProduct> {
    return this.service.updateInvProduct(id, data);
  }

  @Mutation(() => Boolean)
  deleteInvProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.service.deleteInvProduct(id);
  }
}
