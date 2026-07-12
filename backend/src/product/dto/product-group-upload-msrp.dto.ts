import { Field, ID } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Max, Min } from 'class-validator';

export class ProductGroupUploadMsrpDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  id!: number;

  @Field(() => Number)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(100000)
  @Max(3000000)
  msrp!: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy!: number;
}
