import { Gender } from '@/generated/prisma/client';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductCategory {
  @Field(() => ID)
  id: number;
  @Field()
  name: string;
  @Field(() => Gender)
  gender: Gender;
}
