import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductCategoryResolver } from './productCategory.resolver';
import { ProductGroupResolver } from './productGroup.resolver';
import { LaborCostResolver } from './laborCost.resolver';
import { ProductService } from './product.service';
import { ProductCategoryService } from './productCategory.service';
import { ProductGroupService } from './productGroup.service';
import { LaborCostService } from './laborCost.service';
import { ColorResolver } from './color.resolver';
import { ColorService } from './color.service';
import { PrismaModule } from '@/prisma/prisma.module';
import { FileModule } from '@/file/file.module';

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
    LaborCostResolver,
    LaborCostService,
  ],
  imports: [PrismaModule, FileModule],
})
export class ProductModule {}
