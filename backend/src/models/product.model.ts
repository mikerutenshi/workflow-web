import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ProductGroup } from './product-group.model';
import { ProductCategory } from './product-category.model ';
import { ProductColors } from './product-colors.model';

@ObjectType()
export class Product extends BaseModel {
  @Field()
  sku: string;
  @Field({ nullable: true })
  name?: string;
  @Field()
  productGroup: ProductGroup;
  @Field()
  productCategory: ProductCategory;
  @Field(() => [ProductColors])
  productColors: ProductColors[];
}
