import { Field, ID, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional } from 'class-validator';

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
  @IsNotEmpty()
  productGroupId: string;
  @Field(() => ID)
  @IsNotEmpty()
  createdBy: string;
  @Field(() => ID, { nullable: true })
  @IsOptional()
  updatedBy: string | undefined;
}
