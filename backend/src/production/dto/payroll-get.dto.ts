import { Artisan } from '@/models/artisan.model';
import { Product } from '@/models/product.model';
import { Task } from '@/models/task.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { WorkDto } from './work.dto';
import { ProductGroupWithCategory } from '@/models/product-group-with-category.model';
import { ProductWithCategoryDto } from '@/product/dto/product-with-category.dto';

// @ObjectType()
// class ProductGroupWithLaborCosts extends ProductGroup {
//   @Field(() => ProductCategory)
//   productCategory: ProductCategory;
//   @Field(() => [LaborCost])
//   laborCosts: LaborCost[];
// }

// @ObjectType()
// class ProductWithProductGroup extends Product {
//   @Field(() => ProductGroupWithLaborCosts)
//   productGroup: ProductGroupWithLaborCosts;
// }

@ObjectType()
class WorkWithProduct extends WorkDto {
  @Field(() => ProductWithCategoryDto)
  product: ProductWithCategoryDto;
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
