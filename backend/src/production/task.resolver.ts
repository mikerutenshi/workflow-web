import { Task } from '@/models/task.model';
import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { TaskWithArtisan } from '@/models/taskWithArtisan.model';
import { UpdateTaskDto } from './dto/updateTask.dto';

@Resolver(() => Task)
export class TaskResolver {
  constructor(private service: TaskService) {}

  @Query(() => [TaskWithArtisan])
  getTasks(
    @Args('workId', { type: () => ID }, ParseIntPipe) workId: number,
  ): Promise<TaskWithArtisan[]> {
    return this.service.getTasks(workId);
  }

  @Mutation(() => [TaskWithArtisan])
  updateTasks(
    @Args('data', { type: () => [UpdateTaskDto] }) data: UpdateTaskDto[],
  ): Promise<TaskWithArtisan[]> {
    return this.service.updateTasks(data);
  }
}
