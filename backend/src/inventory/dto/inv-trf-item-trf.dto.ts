import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvTrfItemTrfDto extends InvTrfItem {
  @Field(() => InvTrf, { nullable: true })
  invTrf: InvTrf | null;
}
