import { LaborCost } from '@/models/labor-cost.model';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductGroup } from '@/models/product-group.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProductWithColors } from '../../models/product-with-colors.model';

@ObjectType()
export class ProductGroupGetDto extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @Field(() => [ProductWithColors], { nullable: 'itemsAndList' })
  products: ProductWithColors[];
  @Field(() => [LaborCost], { nullable: 'itemsAndList' })
  laborCosts: LaborCost[];
}
