import { Artisan } from '@/models/artisan.model';
import { LaborCost } from '@/models/labor-cost.model';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductGroup } from '@/models/product-group.model';
import { Product } from '@/models/product.model';
import { Task } from '@/models/task.model';
import { Work } from '@/models/work.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ProductGroupWithLaborCosts extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @Field(() => [LaborCost])
  laborCosts: LaborCost[];
}

@ObjectType()
class ProductWithProductGroup extends Product {
  @Field(() => ProductGroupWithLaborCosts)
  productGroup: ProductGroupWithLaborCosts;
}

@ObjectType()
class WorkWithProduct extends Work {
  @Field(() => ProductWithProductGroup)
  product: ProductWithProductGroup;
}

@ObjectType()
class TaskWithWork extends Task {
  @Field(() => WorkWithProduct)
  work: WorkWithProduct;
  @Field()
  quantityPerTask: number;
  @Field()
  costPerTask: number;
  @Field()
  payablePerTask: number;
}

@ObjectType()
class ArtisanWithTasks extends Artisan {
  @Field(() => [TaskWithWork])
  tasks: TaskWithWork[];
  @Field()
  payablePerArtisan: number;
  @Field()
  quantityPerArtisan: number;
}

@ObjectType()
export class PayrollGetDto {
  @Field()
  totalPayable: number;
  @Field()
  totalQuantity: number;
  @Field(() => [ArtisanWithTasks])
  artisans: ArtisanWithTasks[];
}
