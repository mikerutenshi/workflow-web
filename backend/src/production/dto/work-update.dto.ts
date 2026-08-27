import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
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
}
