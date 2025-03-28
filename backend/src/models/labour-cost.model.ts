import { Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';

@ObjectType()
export class LabourCost extends BaseModel {
  @Field()
  drawingUpper: number;
  @Field()
  drawingLining: number;
  @Field()
  stitchingUpper: number;
  @Field(() => Number, { nullable: true })
  stitchingOutsole: number | null;
  @Field(() => Number, { nullable: true })
  stitchingInsole: number | null;
  @Field()
  lasting: number;
  @Field(() => ID)
  productGroupId: number;
}
