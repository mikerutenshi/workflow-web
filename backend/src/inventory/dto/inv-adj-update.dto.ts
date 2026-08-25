import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, ValidateNested } from 'class-validator';
import { InvAdjCreateDto } from './inv-adj-create.dto';
import { InvAdjItemCreateDto } from './inv-adj-item-create.dto';

@InputType()
export class InvAdjUpdateDto extends PartialType(InvAdjCreateDto) {
  // updatedBy, like createdBy, comes from the authenticated context.

  @Field(() => [InvAdjItemCreateDto])
  @Type(() => InvAdjItemCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  invAdjItems!: InvAdjItemCreateDto[];
}
