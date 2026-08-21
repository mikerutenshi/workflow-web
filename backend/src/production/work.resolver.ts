import { Work } from '@/models/work.model';
import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WorkCreateDto } from './dto/work-create.dto';
import { WorkService } from './work.service';
import { WorkUpdateDto } from './dto/work-update.dto';
import { WorkAndTasksDto } from '@/production/dto/work-and-tasks.dto';

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

  @Query(() => WorkAndTasksDto)
  getWork(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<WorkAndTasksDto> {
    return this.workService.getWork(id);
  }

  @Query(() => [WorkAndTasksDto])
  getWorks(
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ): Promise<WorkAndTasksDto[]> {
    return this.workService.getWorks(startDate, endDate);
  }

  @Query(() => String)
  generateOrderNo(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<String> {
    return this.workService.generateOrderNo(date);
  }
}
