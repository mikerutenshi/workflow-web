import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductColors {
  @Field(() => ID)
  productId: string;
  @Field(() => ID)
  colorId: string;
  @Field()
  order: number;
}
