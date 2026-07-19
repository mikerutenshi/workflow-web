import { WorkDto } from '@/production/dto/work.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Product } from '../../models/product.model';
import { TaskAndArtisanDto } from './task-and-artisan.dto';
import { Task } from '../../models/task.model';
import { InvTrf } from '@/models/inv-trf.model';

@ObjectType()
export class WorkAndTasksDto extends WorkDto {
  @Field(() => [TaskAndArtisanDto])
  tasks!: Task[];

  @Field(() => Product)
  product!: Product;

  @Field(() => InvTrf, { nullable: true })
  invTrf?: InvTrf | null;
}
