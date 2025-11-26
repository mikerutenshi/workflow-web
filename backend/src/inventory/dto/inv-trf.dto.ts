import { InvTrf } from '@/models/inv-trf.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { InvTrfItemDto } from './inv-trf-item.dto';
import { Inventory } from '@/models/inventory.model';
import { Work } from '@/models/work.model';

@ObjectType()
export class InvTrfDto extends InvTrf {
  @Field(() => Inventory, { nullable: true })
  fromInv: Inventory | null;
  @Field(() => Inventory)
  toInv: Inventory;
  @Field(() => [InvTrfItemDto])
  invTrfItems: InvTrfItemDto[];
  @Field(() => Work, { nullable: true })
  work?: Work | null;
}
