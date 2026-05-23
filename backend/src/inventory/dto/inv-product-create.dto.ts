import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  IsArray,
  IsDecimal,
  IsInt,
  Min,
  ValidateNested,
} from 'class-validator';
import { InvProductToSizeCreateDto } from './inv-product-to-size-create.dto';

@InputType()
export class InvProductCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  invId!: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  productId!: number;

  @Field(() => [InvProductToSizeCreateDto])
  @Type(() => InvProductToSizeCreateDto)
  @ValidateNested({ each: true })
  invProductSizes!: InvProductToSizeCreateDto[];

  @Field(() => [String])
  @IsArray()
  @IsDecimal({ decimal_digits: '4' }, { each: true })
  discounts!: string[];
}
