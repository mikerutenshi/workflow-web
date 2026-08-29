import { Product } from '@/models/product.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProductGroupWithCategory } from '../../models/product-group-with-category.model';

@ObjectType()
export class ProductWithCategoryDto extends Product {
  @Field(() => ProductGroupWithCategory)
  productGroup!: ProductGroupWithCategory;
}
