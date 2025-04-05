import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class ProductGroup extends BaseModel {
  @Field()
  skuNumeric: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => ID)
  productCategoryId: number;
}
