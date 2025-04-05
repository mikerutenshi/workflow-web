import { AuthGuard } from '@/guards/auth.guard';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtisanService } from './artisan.service';
import { CreateArtisanDto } from './dto/createArtisan.dto';
import { Artisan } from '@/models/artisan.model';

@Resolver(() => Artisan)
export class ArtisanResolver {
  constructor(private artisanService: ArtisanService) {}

  @Mutation(() => Artisan)
  createArtisan(@Args('data') data: CreateArtisanDto): Promise<Artisan> {
    return this.artisanService.createArtisan(data);
  }
  @Mutation(() => Artisan)
  updateArtisan(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: CreateArtisanDto,
  ): Promise<Artisan> {
    return this.artisanService.updateArtisan(id, data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Artisan])
  getArtisans(): Promise<Artisan[]> {
    return this.artisanService.getArtisans();
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteArtisan(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.artisanService.deleteArtisan(id);
  }
}
