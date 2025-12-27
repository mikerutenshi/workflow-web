import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { InvProductToSale } from './inv-product-to-sale.model';

@ObjectType()
export class Sale extends BaseModel {
  @Field()
  saleNo: string;
  @Field(() => Date)
  date?: Date;
  @Field(() => [InvProductToSale])
  saleProducts: InvProductToSale[];
}
