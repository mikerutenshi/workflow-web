import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { SizeToWork } from './size-to-work.model';

@ObjectType()
export class Work extends BaseModel {
  @Field(() => Date)
  date: Date;
  @Field()
  orderNo: string;
  @Field(() => ID)
  productId: number;
  @Field(() => [SizeToWork])
  sizes: SizeToWork[];
}
