import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: number;
  @Field(() => ID)
  createdBy: number;
  @Field(() => ID, { nullable: true })
  updatedBy: number | null;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Date)
  updatedAt: Date;
}
