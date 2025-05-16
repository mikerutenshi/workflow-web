import { LaborCost } from '@/models/labor-cost.model';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductGroup } from '@/models/product-group.model';
import { ProductWithColors } from '@/models/product-with-colors.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class LaborCostGetDto extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @Field(() => [LaborCost], { nullable: 'itemsAndList' })
  laborCosts: LaborCost[];
}
