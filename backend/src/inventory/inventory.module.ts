import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { InvProductService } from './invProduct.service';
import { InvProductResolver } from './invProduct.resolver';

@Module({
  providers: [
    InventoryService,
    InventoryResolver,
    InvProductService,
    InvProductResolver,
  ],
  imports: [PrismaModule],
})
export class InventoryModule {}
