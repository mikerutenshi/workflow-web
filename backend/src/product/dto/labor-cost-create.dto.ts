import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

@InputType()
export class LaborCostCreateDto {
  @Field()
  @IsInt()
  @Min(100)
  drawingUpper: number;
  @Field()
  @IsInt()
  @Min(100)
  drawingLining: number;
  @Field()
  @IsInt()
  @Min(100)
  stitchingUpper: number;
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  stitchingOutsole: number | null;
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  stitchingInsole: number | null;
  @Field()
  @IsInt()
  @Min(100)
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
