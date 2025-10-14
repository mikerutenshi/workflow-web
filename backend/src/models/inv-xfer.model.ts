import { Progress } from '@/generated/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Inventory } from './inventory.model';

@ObjectType()
export class InvXfer extends BaseModel {
  @Field(() => ID, { nullable: true })
  fromInvId: number | null;
  @Field(() => ID)
  toInvId: number;
  @Field(() => Date)
  xferDate: Date;
  @Field(() => Progress)
  progress: Progress;

  @Field(() => Inventory, {nullable: true})
  fromInv: Inventory | null;
  @Field(() => Inventory)
  toInv: Inventory;
}
