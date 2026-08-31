import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, Min, ValidateNested } from 'class-validator';
import { SizeToWorkCreateDto } from './size-to-work-create.dto';
import { WorkCreateDto } from './work-create.dto';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class WorkUpdateDto extends PartialType(WorkCreateDto) {
  @Field(() => [SizeToWorkCreateDto])
  @Type(() => SizeToWorkCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  workSizes!: SizeToWorkCreateDto[];

  // Required, so updateWork can replace the whole set: an omitted tagIds would
  // make the deleteMany below it wipe every tag off the work.
  @Field(() => [ID])
  @Transform(({ value }) => value.map((member: any) => parseInt(member, 10)))
  @IsArray()
  @Min(1, { each: true })
  tagIds!: number[];
}
