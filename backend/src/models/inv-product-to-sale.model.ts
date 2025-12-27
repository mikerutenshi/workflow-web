import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SaleProductToSize } from './sale-product-to-size.model';

@ObjectType()
export class InvProductToSale {
  @Field(() => ID)
  id: number;
  @Field(() => ID)
  saleId: number;
  @Field(() => ID)
  productId: number;
  @Field(() => ID)
  invId: number;
  @Field(() => [SaleProductToSize])
  saleProductSizes: SaleProductToSize[];
}
