import { Field, ID, InputType } from '@nestjs/graphql';
import { Job } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, Min } from 'class-validator';

@InputType()
export class LaborCostUpsertDto {
  @Field(() => Job)
  @IsEnum(Job)
  type: Job;

  @Field()
  @IsInt()
  @Min(100)
  cost: number;

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

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy: number;
}
