import { Field, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';

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
