import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { InvProductService } from './inv-product.service';
import { InvProductResolver } from './inv-product.resolver';
import { InvTrfService } from './inv-trf.service';
import { InvTrfResolver } from './inv-trf.resolver';

@Module({
  providers: [
    InventoryService,
    InventoryResolver,
    InvProductService,
    InvProductResolver,
    InvTrfResolver,
    InvTrfService,
  ],
  imports: [PrismaModule],
})
export class InventoryModule {}
