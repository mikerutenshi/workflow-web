import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { ArrayNotEmpty, IsInt, Min, ValidateNested } from 'class-validator';
import { InvAdjCreateDto } from './inv-adj-create.dto';
import { InvAdjItemCreateDto } from './inv-adj-item-create.dto';

@InputType()
export class InvAdjUpdateDto extends PartialType(
  OmitType(InvAdjCreateDto, ['createdBy'] as const),
) {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy!: number;

  @Field(() => [InvAdjItemCreateDto])
  @Type(() => InvAdjItemCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  invAdjItems!: InvAdjItemCreateDto[];
}
