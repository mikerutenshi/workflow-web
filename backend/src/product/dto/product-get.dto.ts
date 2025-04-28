import { Product } from '@/models/product.model';
import { ProductGroupWithCategory } from '../../models/product-group-with-category.model';
import { ObjectType, Field } from '@nestjs/graphql';
import { ColorToProductWithColor } from '../../models/color-to-product-with-color.model';

@ObjectType()
export class ProductGetDto extends Product {
  @Field(() => ProductGroupWithCategory)
  productGroup: ProductGroupWithCategory;

  @Field(() => [ColorToProductWithColor])
  productColors: ColorToProductWithColor[];
}
