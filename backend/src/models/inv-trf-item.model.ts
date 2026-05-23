import { Progress } from '@/generated/prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { InvTrfItemToSize } from './inv-trf-item-to-size.model';
import { Inventory } from './inventory.model';
import { Transform } from 'class-transformer';
import { Decimal } from '@prisma/client/runtime/client';

@ObjectType()
export class InvTrfItem extends BaseModel {
  @Field(() => ID, { nullable: true })
  invTrfId!: number | null;
  @Field(() => ID, { nullable: true })
  fromInvId?: number | null;
  @Field(() => ID)
  toInvId!: number;
  @Field(() => ID)
  productId!: number;
  @Field(() => [InvTrfItemToSize])
  invTrfItemSizes!: InvTrfItemToSize[];
  @Field(() => Progress)
  progress!: Progress;
  @Field(() => [String])
  // @Transform(({ value }) =>
  //   value instanceof Decimal ? value.toString() : value,
  // )
  discounts!: string[];

  @Field(() => Inventory, { nullable: true })
  fromInv?: Inventory | null;
  @Field(() => Inventory)
  toInv!: Inventory;
}
