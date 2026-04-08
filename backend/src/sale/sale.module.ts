import { InventoryModule } from '@/inventory/inventory.module';
import { Module } from '@nestjs/common';
import { SaleResolver } from './sale.resolver';
import { SaleService } from './sale.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  providers: [SaleResolver, SaleService],
  imports: [PrismaModule, InventoryModule],
})
export class SaleModule {}
