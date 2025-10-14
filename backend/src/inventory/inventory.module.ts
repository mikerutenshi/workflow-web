import { PrismaModule } from '@/prisma/prisma.module';
import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryResolver } from './inventory.resolver';
import { InvProductService } from './invProduct.service';
import { InvProductResolver } from './invProduct.resolver';
import { InvXferService } from './invXfer.service';
import { InvXferResolver } from './invXfer.resolver';

@Module({
  providers: [
    InventoryService,
    InventoryResolver,
    InvProductService,
    InvProductResolver,
    InvXferResolver,
    InvXferService,
  ],
  imports: [PrismaModule],
})
export class InventoryModule {}
