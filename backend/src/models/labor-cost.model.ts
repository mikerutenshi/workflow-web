import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Job } from '@prisma/client';

@ObjectType()
export class LaborCost extends BaseModel {
  @Field()
  type: Job;
  @Field()
  cost: number;
  @Field(() => ID)
  productGroupId: number;
}
