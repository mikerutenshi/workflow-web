import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Job } from '@prisma/client';

@ObjectType()
export class Task extends BaseModel {
  @Field(() => ID)
  workId: number;
  @Field(() => Job)
  type: Job;
  @Field(() => ID, { nullable: true })
  artisanId: number | null;
  @Field(() => Date, { nullable: true })
  doneAt: Date | null;
}
