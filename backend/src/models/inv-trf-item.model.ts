import { Field, ID, ObjectType } from '@nestjs/graphql';
import { InvTrfItemToSize } from './inv-trf-item-to-size.model';

@ObjectType()
export class InvTrfItem {
  @Field(() => ID)
  invTrfId: number;
  @Field(() => ID)
  productId: number;
  @Field(() => [InvTrfItemToSize])
  invTrfItemSizes: InvTrfItemToSize[];
}
