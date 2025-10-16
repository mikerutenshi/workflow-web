import { InvTrf } from '@/models/inv-trf.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { InvTrfItemDto } from './inv-trf-item.dto';

@ObjectType()
export class InvTrfDto extends InvTrf {
  @Field(() => [InvTrfItemDto])
  invTrfItems: InvTrfItemDto[];
}
