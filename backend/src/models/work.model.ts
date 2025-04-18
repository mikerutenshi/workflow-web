import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { Size } from './size.model';

@ObjectType()
export class Work extends BaseModel {
  @Field(() => Date)
  date: Date;
  @Field()
  orderNo: number;
  @Field(() => ID)
  productId: number;
  @Field(() => [SizeToWork])
  sizes: SizeToWork[];
}

@ObjectType()
class SizeToWork {
  @Field(() => ID)
  workId: number;
  @Field(() => ID)
  sizeId: number;
  @Field()
  quantity: number;
  @Field(() => Size)
  size: Size;
}
