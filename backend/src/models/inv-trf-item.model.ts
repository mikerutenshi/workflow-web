import { Progress } from '@/generated/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { InvTrfItemToSize } from './inv-trf-item-to-size.model';
import { Inventory } from './inventory.model';

@ObjectType()
export class InvTrfItem extends BaseModel {
  @Field(() => ID, { nullable: true })
  invTrfId: number | null;
  @Field(() => ID, { nullable: true })
  fromInvId: number | null;
  @Field(() => ID)
  toInvId: number;
  @Field(() => ID)
  productId: number;
  @Field(() => [InvTrfItemToSize])
  invTrfItemSizes: InvTrfItemToSize[];
  @Field(() => Progress)
  progress: Progress;
  @Field(() => ID, { nullable: true })
  workId: number | null;

  @Field(() => Inventory, { nullable: true })
  fromInv: Inventory | null;
  @Field(() => Inventory)
  toInv: Inventory;
}
