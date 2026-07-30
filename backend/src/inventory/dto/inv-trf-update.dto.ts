import { Field, ID, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { InvTrfCreateDto } from './inv-trf-create.dto';

@InputType()
export class InvTrfUpdateDto extends PartialType(
  OmitType(InvTrfCreateDto, ['createdBy']),
) {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy!: number;

  @Field(() => [ID])
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v, 10));
    }
    return [];
  })
  @IsInt({ each: true })
  @Min(1, { each: true })
  invTrfItemIds!: number[];
}
