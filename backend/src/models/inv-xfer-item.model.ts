import { Field, ID, ObjectType } from '@nestjs/graphql';
import { InvXferItemToSize } from './inv-xfer-item-to-size.model';

@ObjectType()
export class InvXferItem {
  @Field(() => ID)
  invXferId: number;
  @Field(() => ID)
  productId: number;
  @Field(() => [InvXferItemToSize])
  invXferItemSizes: InvXferItemToSize[];
}
