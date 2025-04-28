import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';
import { TaskWithArtisan } from './task-with-artisan.model';
import { Work } from './work.model';
import { Task } from './task.model';

@ObjectType()
export class WorkWithTasks extends Work {
  @Field(() => [TaskWithArtisan])
  tasks: Task[];
  @Field(() => Product)
  product: Product;
}
