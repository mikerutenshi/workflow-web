import { InvXferItem } from '@/models/inv-xfer-item.model';
import { InvXfer } from '@/models/inv-xfer.model';
import { Inventory } from '@/models/inventory.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvXferDto extends InvXfer {
  @Field(() => [InvXferItem])
  invXferItems: InvXferItem[];
}
