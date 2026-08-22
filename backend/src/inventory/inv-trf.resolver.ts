import { Progress } from '@/generated/prisma/client';
import { AuthGuard } from '@/guards/auth.guard';
import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvTrfCreateDto } from './dto/inv-trf-create.dto';
import { InvTrfItemCreateDto } from './dto/inv-trf-item-create.dto';
import { InvTrfItemTrfDto } from './dto/inv-trf-item-trf.dto';
import { InvTrfItemDto } from './dto/inv-trf-item.dto';
import { InvTrfSimpleDto } from './dto/inv-trf-simple.dto';
import { InvTrfUpdateDto } from './dto/inv-trf-update.dto';
import { InvTrfDto } from './dto/inv-trf.dto';
import { InvTrfService } from './inv-trf.service';

@Resolver(() => InvTrf)
export class InvTrfResolver {
  constructor(private service: InvTrfService) {}
  @Mutation(() => InvTrf)
  createInvTrf(@Args('data') data: InvTrfCreateDto): Promise<InvTrf> {
    return this.service.createInvTrf(data);
  }

  @Mutation(() => InvTrf)
  updateInvTrf(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: InvTrfUpdateDto,
  ): Promise<InvTrf> {
    return this.service.updateInvTrf(id, data);
  }

  // @Mutation(() => Boolean)
  // updateInvTrfProgress(
  //   @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  //   @Args('data') data: InvTrfUpdateProgressDto,
  // ): Promise<boolean> {
  //   return this.service.updateInvTrfProgress(id, data);
  // }

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
    @Args('progress', { type: () => [Progress], nullable: true })
    progress?: Progress[],
  ): Promise<InvTrfItemDto[]> {
    return this.service.getInvTrfItems(fromInvId, toInvId, progress);
  }

  @Query(() => [InvTrfSimpleDto])
  getInvTrfs(): Promise<InvTrfSimpleDto[]> {
    return this.service.getInvTrfs();
  }

  @Query(() => InvTrfDto)
  getInvTrf(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<InvTrfDto> {
    return this.service.getInvTrf(id);
  }

  @Query(() => String)
  generateInvTrfNo(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<string> {
    return this.service.generateInvTrfNo(date);
  }

  // @UseGuards(RoleGuard)
  // @Roles(Role.Planner)
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteInvTrfItem(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteInvTrfItem(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteInvTrf(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteInvTrf(id);
  }
}
