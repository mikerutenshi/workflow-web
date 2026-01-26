import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { SaleResolver } from './sale.resolver';
import { SaleService } from './sale.service';
import { InvProductService } from '@/inventory/inv-product.service';

@Module({
  providers: [SaleResolver, SaleService, InvProductService],
  imports: [PrismaModule],
})
export class SaleModule {}
