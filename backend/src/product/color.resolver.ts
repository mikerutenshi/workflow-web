import { Color } from '@/models/color.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ColorService } from './color.service';
import { ColorDto } from './dto/color.dto';

@Resolver(() => Color)
export class ColorResolver {
  constructor(private colorService: ColorService) {}

  @Mutation(() => Color)
  createColor(@Args('data') data: ColorDto): Promise<Color> {
    return this.colorService.createColor(data);
  }

  @Query(() => [Color])
  getColors(): Promise<Color[]> {
    return this.colorService.getColors();
  }
}
