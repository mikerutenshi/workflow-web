import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => ID)
  id: number;
  @Field(() => Date)
  createdAt: Date;
  @Field()
  createdBy: number;
  @Field(() => Date)
  updatedAt: Date;
  @Field()
  updatedBy: number;
}
