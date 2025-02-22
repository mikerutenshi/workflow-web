import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductGroup {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  skuNumeric: number;
}
