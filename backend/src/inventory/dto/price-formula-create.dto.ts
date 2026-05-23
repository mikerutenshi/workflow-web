import { Field, InputType } from '@nestjs/graphql';
import {
  IsArray,
  IsDecimal,
  IsInt,
  IsOptional
} from 'class-validator';

@InputType()
export class PriceFormulaCreateDto {
  @Field(() => String, { nullable: true })
  @IsDecimal({ decimal_digits: '2' })
  @IsOptional()
  multiplier?: string | null;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  offset?: number | null;

  @Field(() => [String])
  @IsArray()
  @IsDecimal({ decimal_digits: '4' }, { each: true })
  discounts!: string[];
}
