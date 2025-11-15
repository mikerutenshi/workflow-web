import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsDecimal, IsInt, Min, ValidateNested } from 'class-validator';
import { InvProductToSizeCreateDto } from './inv-product-to-size-create.dto';

@InputType()
export class InvProductCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  invId: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  productId: number;

  @Field(() => [InvProductToSizeCreateDto])
  @Type(() => InvProductToSizeCreateDto)
  @ValidateNested({ each: true })
  invProductSizes: InvProductToSizeCreateDto[];

  @Field(() => Int)
  @IsInt()
  @Min(0)
  price: number;

  @Field()
  @IsDecimal({ decimal_digits: '2' })
  discount: string;
}
