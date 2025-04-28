import { Artisan } from '@/models/artisan.model';
import { LaborCost } from '@/models/labor-cost.model';
import { ProductCategory } from '@/models/product-category.model ';
import { ProductGroup } from '@/models/product-group.model';
import { Product } from '@/models/product.model';
import { Task } from '@/models/task.model';
import { Work } from '@/models/work.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class ProductGroupDto extends ProductGroup {
  @Field(() => ProductCategory)
  productCategory: ProductCategory;
  @Field(() => LaborCost, { nullable: true })
  laborCost?: LaborCost | null;
}

@ObjectType()
class ProductWithGroupDto extends Product {
  @Field(() => ProductGroupDto)
  productGroup: ProductGroupDto;
}

@ObjectType()
class WorkWithProductDto extends Work {
  @Field(() => ProductWithGroupDto)
  product: ProductWithGroupDto;
}

@ObjectType()
class TaskWithWorkDto extends Task {
  @Field(() => WorkWithProductDto)
  work: WorkWithProductDto;
}

@ObjectType()
export class PayrollGetDto extends Artisan {
  @Field(() => [TaskWithWorkDto])
  tasks: TaskWithWorkDto[];
}
