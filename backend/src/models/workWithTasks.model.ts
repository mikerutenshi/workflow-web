import { Field, ObjectType } from '@nestjs/graphql';
import { Work } from './work.model';
import { Task } from './task.model';
import { Product } from './product.model';

@ObjectType()
export class WorkWithTasks extends Work {
  @Field(() => [Task])
  tasks: Task[];
  @Field(() => Product)
  product: Product;
}
