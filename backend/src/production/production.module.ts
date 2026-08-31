import { InventoryModule } from '@/inventory/inventory.module';
import { Module } from '@nestjs/common';
import { PayrollResolver } from './payroll.resolver';
import { PayrollService } from './payroll.service';
import { SizeResolver } from './size.resolver';
import { SizeService } from './size.service';
import { TagResolver } from './tag.resolver';
import { TagService } from './tag.service';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { WorkResolver } from './work.resolver';
import { WorkService } from './work.service';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  providers: [
    WorkResolver,
    WorkService,
    SizeResolver,
    SizeService,
    TaskResolver,
    TaskService,
    PayrollResolver,
    PayrollService,
    TagResolver,
    TagService,
  ],
  imports: [PrismaModule, InventoryModule],
})
export class ProductionModule {}
