import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Color {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  hexCode: string;
}
