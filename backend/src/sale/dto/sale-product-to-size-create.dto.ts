import { InputType, Field, ID } from '@nestjs/graphql';
import { Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class SaleProductToSizeCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  saleProductId: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  sizeId: number;

  @Field()
  @IsInt()
  @Min(0)
  quantity: number;
}
