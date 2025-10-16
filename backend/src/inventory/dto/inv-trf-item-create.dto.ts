import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';
import { InvTrfItemSizeCreateDto } from './inv-trf-item-size-create.dto';

@InputType()
export class InvTrfItemCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  productId: number;

  @Field(() => [InvTrfItemSizeCreateDto])
  @Type(() => InvTrfItemSizeCreateDto)
  @ValidateNested({ each: true })
  invTrfItemSizes: InvTrfItemSizeCreateDto[];
}
