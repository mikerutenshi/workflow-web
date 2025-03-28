import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class Product extends BaseModel {
  @Field()
  sku: string;
  @Field(() => ID)
  productGroupId: number;
}
