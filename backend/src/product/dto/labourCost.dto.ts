import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class LabourCostDto {
  @Field()
  @IsInt()
  skuNumeric: number;
  @Field()
  @IsInt()
  drawingUpper: number;
  @Field()
  @IsInt()
  drawingLining: number;
  @Field()
  @IsInt()
  stitchingUpper: number;
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  stitchingOutsole: number | null;
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  stitchingInsole: number | null;
  @Field()
  @IsInt()
  lasting: number;
  @Field()
  @IsInt()
  productGroupId: number;
  @Field()
  @IsInt()
  createdBy: number;
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  updatedBy?: number | null;
}
