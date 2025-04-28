import { ProductCategory } from '@/models/product-category.model ';
import { ProductGroup } from '@/models/product-group.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProductGroupWithCategory extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
}
