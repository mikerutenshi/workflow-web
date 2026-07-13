import { Module } from '@nestjs/common';
import { ProductResolver } from './product.resolver';
import { ProductCategoryResolver } from './product-category.resolver';
import { ProductGroupResolver } from './product-group.resolver';
import { LaborCostResolver } from './labor-cost.resolver';
import { ProductService } from './product.service';
import { ProductCategoryService } from './product-category.service';
import { ProductGroupService } from './product-group.service';
import { LaborCostService } from './labor-cost.service';
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
