import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { Min, ValidateNested } from 'class-validator';
import { SaleItemToSizeCreateDto } from './sale-item-to-size-create.dto';

@InputType()
export class SaleItemCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  productId: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  invId: number;

  @Field(() => [SaleItemToSizeCreateDto])
  @Type(() => SaleItemToSizeCreateDto)
  @ValidateNested({ each: true })
  saleItemSizes: SaleItemToSizeCreateDto[];
}
