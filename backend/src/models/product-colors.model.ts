import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductColors {
  @Field()
  productId: number;
  @Field()
  colorId: number;
  @Field()
  order: number;
}
