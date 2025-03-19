import { LabourCost } from '@/models/labour-cost.model';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductGroup } from '@/models/product-group.model';
import { Product } from '@/models/product.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class GetProductGroupsDto extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @Field(() => [Product], { nullable: 'itemsAndList' })
  products: Product[];
  @Field(() => LabourCost, { nullable: true })
  labourCost: LabourCost | null;
}
