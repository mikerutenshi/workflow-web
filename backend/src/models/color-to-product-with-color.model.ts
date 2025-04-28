import { Color } from '@/models/color.model';
import { ColorToProduct } from '@/models/color-to-product.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ColorToProductWithColor extends ColorToProduct {
  @Field(() => Color)
  color: Color;
}
