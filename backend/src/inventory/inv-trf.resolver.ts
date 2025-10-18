import { InvTrf } from '@/models/inv-trf.model';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvTrfService } from './inv-trf.service';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrfItemTrfDto } from './dto/inv-trf-item-trf.dto';
import { ParseIntPipe } from '@nestjs/common';
import { InvTrfDto } from './dto/inv-trf.dto';

@Resolver(() => InvTrf)
export class InvTrfResolver {
  constructor(private service: InvTrfService) {}
  @Mutation(() => InvTrf)
  createInvTrf(@Args('data') data: InvTrfCreateDto): Promise<InvTrf> {
    return this.service.createInvTrf(data);
  }

  @Query(() => [InvTrfItemTrfDto])
  getInvTrfItemTrfs(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
  ): Promise<InvTrfItemTrfDto[]> {
    return this.service.getInvTrfItemTrfs(invId, productId);
  }

  @Query(() => [InvTrfDto])
  getInvTrfs(): Promise<InvTrfDto[]> {
    return this.service.getInvTrfs();
  }
}
