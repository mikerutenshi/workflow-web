import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Size {
  @Field(() => ID)
  id: number;
  @Field()
  eu: string;
  @Field(() => String, { nullable: true })
  us: string | null;
  @Field(() => String, { nullable: true })
  uk: string | null;
}
