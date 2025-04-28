import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Size } from './size.model';

@ObjectType()
export class SizeToWork {
  @Field(() => ID)
  workId: number;
  @Field(() => ID)
  sizeId: number;
  @Field()
  quantity: number;
  @Field(() => Size)
  size: Size;
}
