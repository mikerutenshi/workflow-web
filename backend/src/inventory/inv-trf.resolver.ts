import { InvTrf } from '@/models/inv-trf.model';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvTrfService } from './inv-trf.service';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrfPerItemDto } from './dto/inv-trf-per-item.dto';
import { ParseIntPipe } from '@nestjs/common';
import { InvTrfDto } from './dto/inv-trf.dto';

@Resolver(() => InvTrf)
export class InvTrfResolver {
  constructor(private service: InvTrfService) {}
  @Mutation(() => InvTrf)
  createInvTrf(@Args('data') data: InvTrfCreateDto): Promise<InvTrf> {
    return this.service.createInvTrf(data);
  }

  @Query(() => [InvTrfPerItemDto])
  getInvTrfsPerItem(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
  ): Promise<InvTrfPerItemDto[]> {
    return this.service.getInvTrfsPerItem(invId, productId);
  }

  @Query(() => [InvTrfDto])
  getInvTrfs(): Promise<InvTrfDto[]> {
    return this.service.getInvTrfs();
  }
}
