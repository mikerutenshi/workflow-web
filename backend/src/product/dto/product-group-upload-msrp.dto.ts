import { Field, ID } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class ProductGroupUploadMsrpDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  id: number;

  @Field(() => Number)
  @IsInt()
  @Min(99900)
  @Max(2999900)
  msrp: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy: string;
}
