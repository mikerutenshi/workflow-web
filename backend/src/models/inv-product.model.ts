import { Field, ID, Int, ObjectType } from '@nestjs/graphql';
import { InvProductToSize } from './inv-product-to-size.model';

@ObjectType()
export class InvProduct {
  @Field(() => ID)
  invId: number;

  @Field(() => ID)
  productId: number;

  @Field(() => [InvProductToSize])
  invProductSizes: InvProductToSize[];

  @Field(() => Int)
  sellingPrice: number;

  @Field()
  discount: string;
}
