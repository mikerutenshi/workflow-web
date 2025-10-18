import { Progress } from '@/generated/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class InvTrf extends BaseModel {
  @Field()
  trfNo: string;
  @Field(() => ID, { nullable: true })
  fromInvId: number | null;
  @Field(() => ID)
  toInvId: number;
  @Field(() => Date)
  trfDate: Date;
  @Field(() => Progress)
  progress: Progress;
}
