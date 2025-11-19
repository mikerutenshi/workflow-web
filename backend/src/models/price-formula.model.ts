import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PriceFormula {
  @Field(() => ID)
  id: number;

  @Field()
  multiplier: string;

  @Field()
  offset: number;
}
