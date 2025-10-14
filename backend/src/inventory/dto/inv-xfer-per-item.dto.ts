import { InvXferItem } from '@/models/inv-xfer-item.model';
import { InvXfer } from '@/models/inv-xfer.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvXferPerItemDto extends InvXferItem {
  @Field(() => InvXfer)
  invXfer: InvXfer;
}
