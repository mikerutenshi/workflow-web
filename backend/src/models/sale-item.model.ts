import { ObjectType, Field, ID } from '@nestjs/graphql';
import { SaleItemToSize } from './sale-item-to-size.model';

@ObjectType()
export class SaleItem {
  @Field(() => ID)
  id!: number;

  @Field(() => ID)
  saleId!: number;

  @Field(() => ID)
  invId!: number;

  @Field(() => ID)
  productId!: number;

  @Field(() => [SaleItemToSize])
  saleItemSizes!: SaleItemToSize[];
}
