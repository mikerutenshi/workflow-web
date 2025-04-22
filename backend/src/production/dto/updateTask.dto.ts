import { Field, ID, InputType, PickType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional, Min } from 'class-validator';
import { CreateTaskDto } from './createTask.dto';

@InputType()
export class UpdateTaskDto {
  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  artisanId: number | null;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  @IsDate()
  doneAt: Date | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  id: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy: number;
}
