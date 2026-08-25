import { User } from '@/generated/prisma/client';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { InvAdj } from '@/models/inv-adj.model';
import { Role } from '@/models/role.enum';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InvAdjCreateDto } from './dto/inv-adj-create.dto';
import { InvAdjUpdateDto } from './dto/inv-adj-update.dto';
import { InvAdjDto, InvAdjSimpleDto } from './dto/inv-adj.dto';
import { InvAdjService } from './inv-adj.service';

@Resolver(() => InvAdj)
export class InvAdjResolver {
  constructor(private service: InvAdjService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => InvAdj)
  createInvAdj(@Args('data') data: InvAdjCreateDto): Promise<InvAdj> {
    return this.service.createInvAdj(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => InvAdj)
  updateInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: InvAdjUpdateDto,
  ): Promise<InvAdj> {
    return this.service.updateInvAdj(id, data);
  }

  // Posting is the irreversible step that writes stock, so it sits a tier above
  // drafting and takes its actor from the authenticated context, not the payload.
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => InvAdj)
  postInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Context('user') user: User,
  ): Promise<InvAdj> {
    return this.service.postInvAdj(id, user.id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  deleteInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteInvAdj(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [InvAdjSimpleDto])
  getInvAdjs(
    @Args(
      'invId',
      { type: () => ID, nullable: true },
      new ParseIntPipe({ optional: true }),
    )
    invId?: number,
  ): Promise<InvAdjSimpleDto[]> {
    return this.service.getInvAdjs(invId);
  }

  @UseGuards(AuthGuard)
  @Query(() => InvAdjDto)
  getInvAdj(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<InvAdjDto> {
    return this.service.getInvAdj(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  generateInvAdjNo(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<string> {
    return this.service.generateInvAdjNo(date);
  }
}
