import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Role {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field(() => String, { nullable: true })
  description: string | null;
  @Field()
  clearanceLevel: number;
}
