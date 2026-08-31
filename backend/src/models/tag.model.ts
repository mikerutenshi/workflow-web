import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  archived: boolean;
}
