import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Min } from 'class-validator';
import { InvTrfCreateDto } from './inv-trf-create.dto';

@InputType()
export class InvTrfUpdateDto extends PartialType(
  OmitType(InvTrfCreateDto, ['createdBy']),
) {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy: number;
}
