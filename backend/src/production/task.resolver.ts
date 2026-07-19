import { Task } from '@/models/task.model';
import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { TaskAndArtisanDto } from '@/production/dto/task-and-artisan.dto';
import { TaskUpdateDto } from './dto/task-update.dto';
import { AddToInventoryDto } from './dto/add-to=inventory.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private service: TaskService) {}

  @Query(() => [TaskAndArtisanDto])
  getTasks(
    @Args('workId', { type: () => ID }, ParseIntPipe) workId: number,
  ): Promise<TaskAndArtisanDto[]> {
    return this.service.getTasks(workId);
  }

  @Mutation(() => [TaskAndArtisanDto])
  updateTasks(
    @Args('data', { type: () => [TaskUpdateDto] }) data: TaskUpdateDto[],
  ): Promise<TaskAndArtisanDto[]> {
    return this.service.updateTasks(data);
  }

  @Mutation(() => Boolean)
  addToInventory(
    @Args('data', { type: () => AddToInventoryDto }) data: AddToInventoryDto,
  ): Promise<boolean> {
    return this.service.addToInventory(data);
  }
}
