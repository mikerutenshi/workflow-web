import { Field, ID, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from './product-category.model ';
import { Product } from './product.model';
import { LabourCost } from './labour-cost.model';

@ObjectType()
class ProductGroup {
  @Field(() => ID)
  id: number;
  @Field()
  skuNumeric: number;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field()
  productCategoryId: number;
}

@ObjectType()
class GetProductGroup extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @Field(() => [Product], { nullable: 'itemsAndList' })
  products: Product[];
  @Field(() => LabourCost, { nullable: true })
  labourCost: LabourCost | null;
}

export { ProductGroup, GetProductGroup };
