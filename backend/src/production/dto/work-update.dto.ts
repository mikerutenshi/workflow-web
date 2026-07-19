import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, Min, ValidateNested } from 'class-validator';
import { SizeToWorkCreateDto } from './size-to-work-create.dto';
import { WorkCreateDto } from './work-create.dto';

@InputType()
export class WorkUpdateDto extends PartialType(WorkCreateDto) {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy!: number;

  @Field(() => [SizeToWorkCreateDto])
  @Type(() => SizeToWorkCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  workSizes!: SizeToWorkCreateDto[];
}
