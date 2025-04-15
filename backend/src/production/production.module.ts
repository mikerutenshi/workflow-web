import { Module } from '@nestjs/common';
import { SizeResolver } from './size.resolver';
import { SizeService } from './size.service';
import { WorkResolver } from './work.resolver';
import { WorkService } from './work.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  providers: [WorkService, SizeService, WorkResolver, SizeResolver],
  imports: [PrismaModule],
})
export class ProductionModule {}
