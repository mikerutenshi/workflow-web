import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductGroup {
  @Field(() => ID)
  id: number;
  @Field()
  skuNumeric: number;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field()
  productCategoryId: number;
}
