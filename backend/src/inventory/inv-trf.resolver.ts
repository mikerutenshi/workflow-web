import { InvTrf } from '@/models/inv-trf.model';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvTrfService } from './inv-trf.service';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrfItemTrfDto } from './dto/inv-trf-item-trf.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvTrfDto } from './dto/inv-trf.dto';
import { InvTrfItemCreateDto } from './dto/inv-trf-item-create.dto';
import { InvTrfItem } from '@/models/inv-trf-item.model';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { AuthGuard } from '@/guards/auth.guard';
import { InvTrfItemDto } from './dto/inv-trf-item.dto';

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

  @Query(() => [InvTrfItemDto])
  getInvTrfItems(
    @Args('fromInvId', { type: () => ID }, ParseIntPipe) fromInvId: number,
    @Args('toInvId', { type: () => ID }, ParseIntPipe) toInvId: number,
  ): Promise<InvTrfItemDto[]> {
    return this.service.getInvTrfItems(fromInvId, toInvId);
  }

  @Query(() => [InvTrfDto])
  getInvTrfs(): Promise<InvTrfDto[]> {
    return this.service.getInvTrfs();
  }

  @Query(() => String)
  getLastInvTrfNo(): Promise<string | null> {
    return this.service.getLastInvTrfNo();
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteInvTrfItem(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.service.deleteInvTrfItem(id);
  }
}
