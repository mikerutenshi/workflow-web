import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ProductGroup } from './product-group.model';

@ObjectType()
export class LabourCost extends BaseModel {
  @Field()
  skuNumeric: number;
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
  @Field()
  productGroupId: number;
}
