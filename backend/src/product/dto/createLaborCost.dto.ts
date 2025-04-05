import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

@InputType()
export class CreateLaborCostDto {
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
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productGroupId: number;
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  createdBy: number;
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy: number | undefined;
}
