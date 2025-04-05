import { Module } from '@nestjs/common';
import { ArtisanService } from './artisan.service';
import { ArtisanResolver } from './artisan.resolver';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  providers: [ArtisanService, ArtisanResolver],
  imports: [PrismaModule],
})
export class ArtisanModule {}
