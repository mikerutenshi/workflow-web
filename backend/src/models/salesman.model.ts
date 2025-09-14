import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Salesman {
  @Field(() => ID)
  id: number;
  @Field()
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName: string | null;
  @Field()
  phone: string;
  @Field()
  email: string;
}
