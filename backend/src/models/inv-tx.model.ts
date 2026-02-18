import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { TxType } from '@/generated/client';
import { Size } from './size.model';

@ObjectType()
export class InvTx extends BaseModel {
  @Field(() => ID)
  invId: number;

  @Field(() => ID)
  productId: number;

  @Field(() => [InvTxToSize])
  invTxSizes: InvTxToSize[];

  @Field(() => TxType)
  type: TxType;

  @Field(() => ID, { nullable: true })
  saleId?: number | null;

  @Field(() => ID, { nullable: true })
  trfId?: number | null;
}

@ObjectType()
export class InvTxToSize {
  @Field(() => ID)
  invTxId: number;

  @Field(() => ID)
  sizeId: number;

  @Field()
  quantity: number;

  @Field(() => Size)
  size: Size;
}
