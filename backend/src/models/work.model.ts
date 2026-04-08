import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { SizeToWork } from './size-to-work.model';
import { Progress } from '@/generated/prisma/client';

@ObjectType()
export class Work extends BaseModel {
  @Field(() => Date)
  date: Date;
  @Field()
  orderNo: string;
  @Field(() => ID)
  productId: number;
  @Field(() => Progress)
  progress: Progress;
  @Field(() => String, { nullable: true })
  note?: string | null;
}
