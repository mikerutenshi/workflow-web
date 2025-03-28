import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductGroup {
  @Field(() => ID)
  id: number;
  @Field()
  skuNumeric: string;
  @Field(() => String, { nullable: true })
  name: string | null;
  @Field(() => ID)
  productCategoryId: number;
}
