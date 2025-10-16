import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvTrfPerItemDto extends InvTrfItem {
  @Field(() => InvTrf)
  invTrf: InvTrf;
}
