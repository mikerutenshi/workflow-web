import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Min } from 'class-validator';
import { InvXferCreateDto } from './inv-xfer-create.dto';

@InputType()
export class InvXferUpdateDto extends PartialType(
  OmitType(InvXferCreateDto, ['createdBy']),
) {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy: number;
}
