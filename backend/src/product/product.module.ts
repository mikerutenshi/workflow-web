import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductGroupResolver } from './productGroup.resolver';
import { LabourCostResolver } from './labourCost.resolver';
import { ProductService } from './product.service';
import { ProductCategoryService } from './productCategory.service';
import { ProductGroupService } from './productGroup.service';
import { LabourCostService } from './labourCost.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { ColorResolver } from './color.resolver';
import { ColorService } from './color.service';

@Module({
  providers: [
    ColorResolver,
    ColorService,
    ProductResolver,
    ProductService,
    ProductCategoryResolver,
    ProductCategoryService,
    ProductGroupResolver,
    ProductGroupService,
    LabourCostResolver,
    LabourCostService,
  ],
  imports: [PrismaModule],
})
export class ProductModule {}
