import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: number;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => ID)
  createdBy: number;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => ID, { nullable: true })
  updatedBy: number | null;
}
