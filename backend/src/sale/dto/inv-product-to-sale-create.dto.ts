import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { Min, ValidateNested } from 'class-validator';
import { SaleProductToSizeCreateDto } from './sale-product-to-size-create.dto';

@InputType()
export class InvProductToSaleCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  productId: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  invId: number;

  @Field(() => [SaleProductToSizeCreateDto])
  @Type(() => SaleProductToSizeCreateDto)
  @ValidateNested({ each: true })
  saleProductSizes: SaleProductToSizeCreateDto[];
}
