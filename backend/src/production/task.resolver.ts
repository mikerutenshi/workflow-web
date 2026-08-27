import { Task } from '@/models/task.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { TaskAndArtisanDto } from '@/production/dto/task-and-artisan.dto';
import { TaskUpdateDto } from './dto/task-update.dto';
import { AddToInventoryDto } from './dto/add-to=inventory.dto';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private service: TaskService) {}

  @Query(() => [TaskAndArtisanDto])
  getTasks(
    @Args('workId', { type: () => ID }, ParseIntPipe) workId: number,
  ): Promise<TaskAndArtisanDto[]> {
    return this.service.getTasks(workId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Field)
  @Mutation(() => [TaskAndArtisanDto])
  updateTasks(
    @Args('data', { type: () => [TaskUpdateDto] }) data: TaskUpdateDto[],
  ): Promise<TaskAndArtisanDto[]> {
    return this.service.updateTasks(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Field)
  @Mutation(() => Boolean)
  addToInventory(
    @Args('data', { type: () => AddToInventoryDto }) data: AddToInventoryDto,
  ): Promise<boolean> {
    return this.service.addToInventory(data);
  }
}
