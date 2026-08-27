import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/guards/current-user.decorator';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { User } from '@/models/user.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ArtisanService } from './artisan.service';
import { ArtisanCreateDto } from './dto/artisan-create.dto';
import { Artisan } from '@/models/artisan.model';

@Resolver(() => Artisan)
export class ArtisanResolver {
  constructor(private artisanService: ArtisanService) {}

  // Planner and Field can browse artisans, but only Finance and above maintain
  // the roster -- see the `setting-artisans` entry in the layout's createBtns.
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => Artisan)
  createArtisan(
    @Args('data') data: ArtisanCreateDto,
    @CurrentUser() user: User,
  ): Promise<Artisan> {
    return this.artisanService.createArtisan(data, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => Artisan)
  updateArtisan(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ArtisanCreateDto,
    @CurrentUser() user: User,
  ): Promise<Artisan> {
    return this.artisanService.updateArtisan(id, data, user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Artisan])
  getArtisans(): Promise<Artisan[]> {
    return this.artisanService.getArtisans();
  }

  @UseGuards(AuthGuard)
  @Query(() => Artisan)
  getArtisan(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Artisan> {
    return this.artisanService.getArtisan(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => Boolean)
  deleteArtisan(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.artisanService.deleteArtisan(id);
  }
}
