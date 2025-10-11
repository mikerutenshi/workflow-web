import { Job } from '@/generated/client';
import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class Artisan extends BaseModel {
  @Field()
  firstName: string;
  @Field(() => String, { nullable: true })
  lastName?: string | null;
  @Field(() => [Job])
  jobs: Job[];
}
