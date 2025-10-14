import { InvXfer } from '@/models/inv-xfer.model';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvXferService } from './invXfer.service';
import { InvXferCreateDto } from './dto/inv-xfer-create.dto';
import { InvXferPerItemDto } from './dto/inv-xfer-per-item.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => InvXfer)
export class InvXferResolver {
  constructor(private service: InvXferService) {}
  @Mutation(() => InvXfer)
  createInvXfer(@Args('data') data: InvXferCreateDto): Promise<InvXfer> {
    return this.service.createInvXfer(data);
  }

  @Query(() => [InvXferPerItemDto])
  getInvXfersPerItem(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
  ): Promise<InvXferPerItemDto[]> {
    return this.service.getInvXfersPerItem(invId, productId);
  }
}
