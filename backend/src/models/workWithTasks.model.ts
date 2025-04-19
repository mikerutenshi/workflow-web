import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from './product.model';
import { TaskWithArtisan } from './taskWithArtisan.model';
import { Work } from './work.model';

@ObjectType()
export class WorkWithTasks extends Work {
  @Field(() => [TaskWithArtisan])
  tasks: TaskWithArtisan[];
  @Field(() => Product)
  product: Product;
}
