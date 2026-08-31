import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { Tag } from '@/models/tag.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TagCreateDto } from './dto/tag-create.dto';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private tagService: TagService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Tag)
  createTag(@Args('data') data: TagCreateDto): Promise<Tag> {
    return this.tagService.createTag(data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Tag])
  getTags(): Promise<Tag[]> {
    return this.tagService.getTags();
  }

  @UseGuards(AuthGuard)
  @Query(() => Tag)
  getTag(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Tag> {
    return this.tagService.getTag(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Tag)
  updateTag(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: TagCreateDto,
  ): Promise<Tag> {
    return this.tagService.updateTag(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  deleteTag(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.tagService.deleteTag(id);
  }
}
