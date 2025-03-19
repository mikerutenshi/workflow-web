import { Color } from '@/models/color.model';
import { ProductColors } from '@/models/product-colors.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ProductColorsWithColor extends ProductColors {
  @Field(() => Color)
  color: Color;
}
