import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/guards/current-user.decorator';
import { RoleGuard } from '@/guards/role.guard';
import { Roles, RolesAny } from '@/guards/roles.decorator';
import { InvAdj } from '@/models/inv-adj.model';
import { Role } from '@/models/role.enum';
// The GraphQL model, not the Prisma one: only this shape declares `role` and
// `userInventories`, which AuthService.me attaches to the Apollo context.
import { User } from '@/models/user.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvAdjCreateDto } from './dto/inv-adj-create.dto';
import { InvAdjUpdateDto } from './dto/inv-adj-update.dto';
import { InvAdjDto, InvAdjSimpleDto } from './dto/inv-adj.dto';
import { InvAdjService } from './inv-adj.service';

@Resolver(() => InvAdj)
export class InvAdjResolver {
  constructor(private service: InvAdjService) {}

  // Counting is done by whoever is standing at the shelf, so Sales drafts too.
  // Field is deliberately absent despite outranking Sales on clearance, which
  // is why this is a set rather than a Roles threshold.
  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Mutation(() => InvAdj)
  createInvAdj(
    @Args('data') data: InvAdjCreateDto,
    @CurrentUser() user: User,
  ): Promise<InvAdj> {
    return this.service.createInvAdj(data, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Mutation(() => InvAdj)
  updateInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: InvAdjUpdateDto,
    @CurrentUser() user: User,
  ): Promise<InvAdj> {
    return this.service.updateInvAdj(id, data, user);
  }

  // Posting is the irreversible step that writes stock, so it sits a tier above
  // drafting and takes its actor from the authenticated context, not the payload.
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => InvAdj)
  postInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<InvAdj> {
    return this.service.postInvAdj(id, user.id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Mutation(() => Boolean)
  deleteInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.service.deleteInvAdj(id, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Query(() => [InvAdjSimpleDto])
  getInvAdjs(
    @CurrentUser() user: User,
    @Args(
      'invId',
      { type: () => ID, nullable: true },
      new ParseIntPipe({ optional: true }),
    )
    invId?: number,
  ): Promise<InvAdjSimpleDto[]> {
    return this.service.getInvAdjs(user, invId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Query(() => InvAdjDto)
  getInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ): Promise<InvAdjDto> {
    return this.service.getInvAdj(id, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Query(() => String)
  generateInvAdjNo(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<string> {
    return this.service.generateInvAdjNo(date);
  }
}
