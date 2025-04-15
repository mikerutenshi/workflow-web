import { Size } from '@/models/size.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ParseIntPipe } from '@nestjs/common';
import { CreateSizeDto } from './dto/createSize.dto';
import { SizeService } from './size.service';

@Resolver(() => Size)
export class SizeResolver {
  constructor(private sizeService: SizeService) {}

  @Mutation(() => Size)
  createSize(@Args('data') data: CreateSizeDto): Promise<Size> {
    return this.sizeService.createSize(data);
  }

  @Mutation(() => Size)
  updateSize(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: CreateSizeDto,
  ): Promise<Size> {
    return this.sizeService.updateSize(id, data);
  }

  @Mutation(() => Boolean)
  deleteSize(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.sizeService.deleteSize(id);
  }

  @Query(() => Size)
  getSize(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Size> {
    return this.sizeService.getSize(id);
  }

  @Query(() => [Size])
  getSizes(): Promise<Size[]> {
    return this.sizeService.getSizes();
  }
}
