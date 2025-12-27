import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Size } from './size.model';

@ObjectType()
export class SaleProductToSize {
  @Field(() => ID)
  saleProductId: number;
  @Field(() => ID)
  sizeId: number;
  @Field()
  quantity: number;
  @Field(() => Size)
  size: Size;
}
