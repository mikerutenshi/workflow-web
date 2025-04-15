import { Work } from '@/models/work.model';
import { ParseIntPipe } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateWorkDto } from './dto/createWork.dto';
import { WorkService } from './work.service';
import { UpdateWorkDto } from './dto/updateWork.dto';

@Resolver(() => Work)
export class WorkResolver {
  constructor(private workService: WorkService) {}

  @Mutation(() => Work)
  createWork(@Args('data') data: CreateWorkDto): Promise<Work> {
    return this.workService.createWork(data);
  }

  @Mutation(() => Work)
  updateWork(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: UpdateWorkDto,
  ): Promise<Work> {
    return this.workService.updateWork(id, data);
  }

  @Mutation(() => Boolean)
  deleteWork(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.workService.deleteWork(id);
  }

  @Query(() => Work)
  getWork(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Work> {
    return this.workService.getWork(id);
  }

  @Query(() => [Work])
  getWorks(): Promise<Work[]> {
    return this.workService.getWorks();
  }
}
