import { Color } from '@/models/color.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColorService } from './color.service';
import { ColorCreateDto } from './dto/color-create.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';

@Resolver(() => Color)
export class ColorResolver {
  constructor(private colorService: ColorService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Color)
  createColor(@Args('data') data: ColorCreateDto): Promise<Color> {
    return this.colorService.createColor(data);
  }

  @Query(() => [Color])
  getColors(): Promise<Color[]> {
    return this.colorService.getColors();
  }

  @Query(() => Color)
  getColor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Color> {
    return this.colorService.getColor(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Color)
  updateColor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ColorCreateDto,
  ): Promise<Color> {
    return this.colorService.updateColor(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  deleteColor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.colorService.deleteColor(id);
  }

  @Query(() => String)
  downloadColors(): Promise<string> {
    return this.colorService.downloadColors();
  }
}
