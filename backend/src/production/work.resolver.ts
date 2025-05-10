import { Work } from '@/models/work.model';
import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WorkCreateDto } from './dto/work-create.dto';
import { WorkService } from './work.service';
import { WorkUpdateDto } from './dto/work-update.dto';
import { WorkWithTasks } from '@/models/work-with-tasks.model';

@Resolver(() => Work)
export class WorkResolver {
  constructor(private workService: WorkService) {}

  @Mutation(() => Work)
  createWork(@Args('data') data: WorkCreateDto): Promise<Work> {
    return this.workService.createWork(data);
  }

  @Mutation(() => Work)
  updateWork(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: WorkUpdateDto,
  ): Promise<Work> {
    return this.workService.updateWork(id, data);
  }

  @Mutation(() => Boolean)
  deleteWork(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.workService.deleteWork(id);
  }

  @Query(() => WorkWithTasks)
  getWork(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<WorkWithTasks> {
    return this.workService.getWork(id);
  }

  @Query(() => [WorkWithTasks])
  getWorks(
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ): Promise<WorkWithTasks[]> {
    return this.workService.getWorks(startDate, endDate);
  }
}
