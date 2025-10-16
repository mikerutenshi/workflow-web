import { Module } from '@nestjs/common';
import { SizeResolver } from './size.resolver';
import { SizeService } from './size.service';
import { WorkResolver } from './work.resolver';
import { WorkService } from './work.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';
import { PayrollResolver } from './payroll.resolver';
import { PayrollService } from './payroll.service';
import { InvProductService } from '@/inventory/inv-product.service';
import { InvTrfService } from '@/inventory/inv-trf.service';

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
    InvProductService,
    InvTrfService,
  ],
  imports: [PrismaModule],
})
export class ProductionModule {}
