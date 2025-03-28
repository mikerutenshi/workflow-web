import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: string;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => ID)
  createdBy: string;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => ID, { nullable: true })
  updatedBy: string | null;
}
