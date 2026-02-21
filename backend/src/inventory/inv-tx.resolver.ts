import { InvTx } from '@/models/inv-tx.model';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvTxService } from './inv-tx.service';
import { ParseIntPipe } from '@nestjs/common';
import { InvTxDto } from './dto/inv-tx.dto';

@Resolver()
export class InvTxResolver {
  constructor(private service: InvTxService) {}

  @Query(() => [InvTxDto])
  getInvTxs(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
  ): Promise<InvTxDto[]> {
    return this.service.getInvTxs(invId, productId);
  }
}
