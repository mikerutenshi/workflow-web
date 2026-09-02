import { Progress } from '@/generated/prisma/client';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/guards/current-user.decorator';
import { RoleGuard } from '@/guards/role.guard';
import { RolesAny } from '@/guards/roles.decorator';
import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { Role } from '@/models/role.enum';
import { User } from '@/models/user.model';
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

// Storefronts move their own stock, so Sales transfers; Field is absent despite
// outranking Sales on clearance, which is why this is a set not a threshold.
const CAN_TRANSFER = [
  Role.Superuser,
  Role.Finance,
  Role.Planner,
  Role.Sales,
] as const;

@Resolver(() => InvTrf)
export class InvTrfResolver {
  constructor(private service: InvTrfService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(...CAN_TRANSFER)
  @Mutation(() => InvTrf)
  createInvTrf(
    @Args('data') data: InvTrfCreateDto,
    @CurrentUser() user: User,
  ): Promise<InvTrf> {
    return this.service.createInvTrf(data, user.id);
  }

  // Takes the actor from the context: the service reads clearance off it to
  // decide whether a COMPLETED transfer may be reopened, and data.updatedBy is
  // client-supplied so it cannot be trusted for that.
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(...CAN_TRANSFER)
  @Mutation(() => InvTrf)
  updateInvTrf(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: InvTrfUpdateDto,
    @CurrentUser() user: User,
  ): Promise<InvTrf> {
    return this.service.updateInvTrf(id, data, user);
  }

  // @Mutation(() => Boolean)
  // updateInvTrfProgress(
  //   @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  //   @Args('data') data: InvTrfUpdateProgressDto,
  // ): Promise<boolean> {
  //   return this.service.updateInvTrfProgress(id, data);
  // }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(...CAN_TRANSFER)
  @Mutation(() => InvTrfItem)
  createInvTrfItem(
    @Args('data') data: InvTrfItemCreateDto,
    @CurrentUser() user: User,
  ): Promise<InvTrfItem> {
    return this.service.createInvTrfItem(data, user.id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [InvTrfItemTrfDto])
  getInvTrfItemTrfs(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
  ): Promise<InvTrfItemTrfDto[]> {
    return this.service.getInvTrfItemTrfs(invId, productId);
  }

  @UseGuards(AuthGuard)
  @Query(() => [InvTrfItemDto])
  getInvTrfItems(
    @Args('fromInvId', { type: () => ID }, ParseIntPipe) fromInvId: number,
    @Args('toInvId', { type: () => ID }, ParseIntPipe) toInvId: number,
    @Args('progress', { type: () => [Progress], nullable: true })
    progress?: Progress[],
  ): Promise<InvTrfItemDto[]> {
    return this.service.getInvTrfItems(fromInvId, toInvId, progress);
  }

  @UseGuards(AuthGuard)
  @Query(() => [InvTrfSimpleDto])
  getInvTrfs(
    @Args('startDate', { type: () => Date, nullable: true })
    startDate?: Date,
    @Args('endDate', { type: () => Date, nullable: true })
    endDate?: Date,
  ): Promise<InvTrfSimpleDto[]> {
    return this.service.getInvTrfs(startDate, endDate);
  }

  @UseGuards(AuthGuard)
  @Query(() => InvTrfDto)
  getInvTrf(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<InvTrfDto> {
    return this.service.getInvTrf(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  generateInvTrfNo(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<string> {
    return this.service.generateInvTrfNo(date);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(...CAN_TRANSFER)
  @Mutation(() => Boolean)
  deleteInvTrfItem(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteInvTrfItem(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(...CAN_TRANSFER)
  @Mutation(() => Boolean)
  deleteInvTrf(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteInvTrf(id);
  }
}
