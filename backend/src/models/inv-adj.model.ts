import { Progress } from '@/generated/prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class InvAdj extends BaseModel {
  @Field()
  adjNo!: string;

  @Field(() => ID)
  invId!: number;

  @Field(() => Date)
  adjDate!: Date;

  @Field(() => Progress)
  progress!: Progress;

  @Field(() => String, { nullable: true })
  note?: string | null;
}
