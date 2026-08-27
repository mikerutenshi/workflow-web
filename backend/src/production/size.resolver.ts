import { Size } from '@/models/size.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { SizeCreateDto } from './dto/size-create-dto.js';
import { SizeService } from './size.service';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';

@Resolver(() => Size)
export class SizeResolver {
  constructor(private sizeService: SizeService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Size)
  createSize(@Args('data') data: SizeCreateDto): Promise<Size> {
    return this.sizeService.createSize(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Size)
  updateSize(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: SizeCreateDto,
  ): Promise<Size> {
    return this.sizeService.updateSize(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  deleteSize(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.sizeService.deleteSize(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => Size)
  getSize(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Size> {
    return this.sizeService.getSize(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Size])
  getSizes(): Promise<Size[]> {
    return this.sizeService.getSizes();
  }
}
