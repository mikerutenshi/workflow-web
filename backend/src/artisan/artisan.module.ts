import { Module } from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { ArtisanResolver } from './artisan.resolver';

@Module({
  providers: [ArtisanService, ArtisanResolver],
})
export class ArtisanModule {}
