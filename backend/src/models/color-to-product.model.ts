import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ColorToProduct {
  @Field(() => ID)
  productId: number;
  @Field(() => ID)
  colorId: number;
  @Field()
  order: number;
}
