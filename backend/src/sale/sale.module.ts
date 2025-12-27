import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { SaleResolver } from './sale.resolver';
import { SaleService } from './sale.service';

@Module({
  providers: [SaleResolver, SaleService],
  imports: [PrismaModule],
})
export class SaleModule {}
