import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { InvProductService } from './inv-product.service';
import { InvProductResolver } from './inv-product.resolver';
import { InvTrfService } from './inv-trf.service';
import { InvTrfResolver } from './inv-trf.resolver';
import { InvTxService } from './inv-tx.service';
import { InvTxResolver } from './inv-tx.resolver';

@Module({
  providers: [
    InventoryService,
    InventoryResolver,
    InvProductService,
    InvProductResolver,
    InvTrfResolver,
    InvTrfService,
    InvTxResolver,
    InvTxService,
  ],
  imports: [PrismaModule],
  exports: [InvProductService, InvTrfService],
})
export class InventoryModule {}
