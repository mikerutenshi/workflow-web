import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Color } from './color.model';

@ObjectType()
export class ProductColors {
  @Field()
  productId: number;
  @Field()
  colorId: number;
  @Field(() => Color)
  color: Color;
  @Field()
  order: number;
}
