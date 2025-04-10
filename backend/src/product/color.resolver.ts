import { Color } from '@/models/color.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/createColor.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => Color)
export class ColorResolver {
  constructor(private colorService: ColorService) {}

  @Mutation(() => Color)
  createColor(@Args('data') data: CreateColorDto): Promise<Color> {
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

  @Mutation(() => Color)
  updateColor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: CreateColorDto,
  ): Promise<Color> {
    return this.colorService.updateColor(id, data);
  }

  @Mutation(() => Boolean)
  deleteColor(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.colorService.deleteColor(id);
  }
}
