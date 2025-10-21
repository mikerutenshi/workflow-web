import { InvTrf } from '@/models/inv-trf.model';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvTrfService } from './inv-trf.service';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrfItemTrfDto } from './dto/inv-trf-item-trf.dto';
import { ParseIntPipe } from '@nestjs/common';
import { InvTrfDto } from './dto/inv-trf.dto';
import { InvTrfItemCreateDto } from './dto/inv-trf-item-create.dto';
import { InvTrfItem } from '@/models/inv-trf-item.model';

@Resolver(() => InvTrf)
export class InvTrfResolver {
  constructor(private service: InvTrfService) {}
  @Mutation(() => InvTrf)
  createInvTrf(@Args('data') data: InvTrfCreateDto): Promise<InvTrf> {
    return this.service.createInvTrf(data);
  }

  @Mutation(() => InvTrfItem)
  createInvTrfItem(
    @Args('data') data: InvTrfItemCreateDto,
  ): Promise<InvTrfItem> {
    return this.service.createInvTrfItem(data);
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
