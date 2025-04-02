import { LaborCost } from '@/models/labor-cost.model';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductGroup } from '@/models/product-group.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { ProductWithColorDto } from './productWithColor.dto';

@ObjectType()
export class GetProductGroupsDto extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @Field(() => [ProductWithColorDto], { nullable: 'itemsAndList' })
  products: ProductWithColorDto[];
  @Field(() => LaborCost, { nullable: true })
  laborCost: LaborCost | null;
}
