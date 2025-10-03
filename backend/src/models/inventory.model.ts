import { InvType } from '@/generated/client';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(InvType, { name: 'InvType' });

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
