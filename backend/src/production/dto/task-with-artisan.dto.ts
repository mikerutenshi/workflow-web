import { Artisan } from '@/models/artisan.model';
import { Task } from '@/models/task.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TaskWithArtisanDto extends Task {
  @Field(() => Artisan, { nullable: true })
  artisan: Artisan | null;
}
