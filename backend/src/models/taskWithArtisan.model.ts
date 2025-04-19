import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from './task.model';
import { Artisan } from './artisan.model';

@ObjectType()
export class TaskWithArtisan extends Task {
  @Field(() => Artisan, { nullable: true })
  artisan: Artisan | null;
}
