import { Field } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { ProductGroup } from './product-group.model';

export class LabourCost extends BaseModel {
  @Field()
  skuNumeric: number;
  @Field()
  drawingUpper: number;
  @Field()
  drawingLining: number;
  @Field()
  stitchingUpper: number;
  @Field({ nullable: true })
  stitchingOutsole: number;
  @Field({ nullable: true })
  stitchingInsole: number;
  @Field()
  lasting: number;
  @Field(() => ProductGroup)
  productGroup: ProductGroup;
}
