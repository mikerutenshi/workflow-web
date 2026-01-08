import { InputType, Field, ID } from '@nestjs/graphql';
import { Min, IsInt } from 'class-validator';
import { Transform } from 'class-transformer';

@InputType()
export class SaleItemToSizeCreateDto {
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
