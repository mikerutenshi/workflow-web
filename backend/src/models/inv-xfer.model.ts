import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { SizeToWork } from './size-to-work.model';
import { Progress } from '@/generated/client';
import { InvXferItem } from './inv-xfer-item.model';

@ObjectType()
export class InvXfer extends BaseModel {
  @Field(() => ID)
  fromInvId: number;
  @Field(() => ID)
  toInvId: number;
  @Field(() => Date)
  xferDate: Date;
  @Field(() => Progress)
  progress: Progress;
  @Field(() => [InvXferItem])
  invXferItems: InvXferItem[];
}
