import { InvType } from '@/generated/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Inventory {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field()
  address: string;
  @Field()
  city: string;
  @Field()
  province: string;
  @Field(() => InvType)
  type: InvType;
}
