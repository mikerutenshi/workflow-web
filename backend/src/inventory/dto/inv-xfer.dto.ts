import { InvXfer } from '@/models/inv-xfer.model';
import { Inventory } from '@/models/inventory.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvXferDto extends InvXfer {
  @Field(() => Inventory)
  fromInv: Inventory;
  @Field(() => Inventory)
  toInv: Inventory;
}
