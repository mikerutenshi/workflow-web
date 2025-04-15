import { Optional } from '@nestjs/common';
import { InputType, Field, ID } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, Min } from 'class-validator';
import { Job } from '@prisma/client';

@InputType()
export class UpdateTaskDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  workId: number;

  @Field(() => Job)
  @IsEnum(Job)
  type: Job;

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  artisanId: number | null;

  @Field(() => Date, { nullable: true })
  @Optional()
  @IsDate()
  doneAt: Date | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy: number;
}
