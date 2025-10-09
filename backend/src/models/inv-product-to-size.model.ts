import { ObjectType, Field, Int, ID } from '@nestjs/graphql';
import { Size } from './size.model';

@ObjectType()
export class InvProductToSize {
  @Field(() => ID)
  invId: number;

  @Field(() => ID)
  productId: number;

  @Field(() => ID)
  sizeId: number;

  @Field(() => Int)
  quantity: number;

  @Field(() => Size)
  size: Size;
}
