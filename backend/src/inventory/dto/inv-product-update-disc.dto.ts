import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { Min, IsArray, IsDecimal } from 'class-validator';

@InputType()
export class InvProductUpdateDiscDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  invId!: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  productId!: number;

  @Field(() => [String])
  @IsArray()
  @IsDecimal({ decimal_digits: '4' }, { each: true })
  discounts!: string[];
}
