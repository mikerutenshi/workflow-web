import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Size } from './size.model';

@ObjectType()
export class InvXferItemToSize {
  @Field(() => ID)
  invXferId: number;
  @Field(() => ID)
  productId: number;
  @Field(() => ID)
  sizeId: number;
  @Field()
  quantity: number;
  @Field(() => Size)
  size: Size;
}
