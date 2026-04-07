import { InventoryModule } from '@/inventory/inventory.module';
import { Module } from '@nestjs/common';
import { SaleResolver } from './sale.resolver';
import { SaleService } from './sale.service';

@Module({
  providers: [SaleResolver, SaleService],
  imports: [InventoryModule],
})
export class SaleModule {}
