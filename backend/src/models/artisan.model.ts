import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Job } from '@prisma/client';
import { BaseModel } from './base.model';

registerEnumType(Job, { name: 'Job' });

@ObjectType()
export class Artisan extends BaseModel {
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field(() => [Job])
  jobs: Job[];
}
