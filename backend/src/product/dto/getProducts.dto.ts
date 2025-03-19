import { Product } from '@/models/product.model';
import { ProductGroupWithCategoryDto } from './productGroupWithCategory.dto';
import { ObjectType, Field } from '@nestjs/graphql';
import { ProductColorsWithColor } from './productColorsWithColor.dto';

@ObjectType()
export class GetProductsDto extends Product {
  @Field(() => ProductGroupWithCategoryDto)
  productGroup: ProductGroupWithCategoryDto;

  @Field(() => [ProductColorsWithColor])
  productColors: ProductColorsWithColor[];
}
