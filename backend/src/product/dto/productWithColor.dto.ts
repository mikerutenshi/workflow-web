import { Product } from '@/models/product.model';
import { ProductColorsWithColor } from './productColorsWithColor.dto';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ProductWithColorDto extends Product {
  @Field(() => [ProductColorsWithColor])
  productColors: ProductColorsWithColor[];
}
