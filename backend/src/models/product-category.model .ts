import { Gender } from '@/generated/client';
import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';

registerEnumType(Gender, { name: 'Gender' });

@ObjectType()
export class ProductCategory {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field(() => Gender)
  gender: Gender;
}
