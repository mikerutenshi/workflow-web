import { Product } from '@/models/product.model';
import { ColorToProductWithColor } from './color-to-product-with-color.model';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProductWithColors extends Product {
  @Field(() => [ColorToProductWithColor])
  productColors: ColorToProductWithColor[];
}
