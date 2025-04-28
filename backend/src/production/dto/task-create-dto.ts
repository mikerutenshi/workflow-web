import { Field, ID, InputType } from '@nestjs/graphql';
import { Job } from '@prisma/client';
import { Transform } from 'class-transformer';
import { IsDate, IsEnum, IsOptional, Min } from 'class-validator';

@InputType()
export class TaskCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  workId: number;

  @Field(() => Job)
  @IsEnum(Job)
  type: Job;

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @Min(1)
  artisanId: number | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  doneAt: Date | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;
}
