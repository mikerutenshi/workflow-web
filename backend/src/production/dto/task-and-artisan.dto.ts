import { Field, ObjectType } from '@nestjs/graphql';
import { Task } from '../../models/task.model';
import { Artisan } from '../../models/artisan.model';

@ObjectType()
export class TaskAndArtisanDto extends Task {
  @Field(() => Artisan, { nullable: true })
  artisan!: Artisan | null;
}
