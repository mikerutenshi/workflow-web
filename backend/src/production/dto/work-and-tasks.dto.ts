import { InvTrf } from '@/models/inv-trf.model';
import { ProductWithCategoryDto } from '@/product/dto/product-with-category.dto';
import { WorkDto } from '@/production/dto/work.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../../models/task.model';
import { TaskAndArtisanDto } from './task-and-artisan.dto';

@ObjectType()
export class WorkAndTasksDto extends WorkDto {
  @Field(() => [TaskAndArtisanDto])
  tasks!: Task[];

  @Field(() => ProductWithCategoryDto)
  product!: ProductWithCategoryDto;

  @Field(() => InvTrf, { nullable: true })
  invTrf?: InvTrf | null;
}
