import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PriceFormula {
  @Field(() => ID)
  id: number;

  @Field(() => String, { nullable: true })
  multiplier: string | null;

  @Field(() => Number, { nullable: true })
  offset: number | null;
}
