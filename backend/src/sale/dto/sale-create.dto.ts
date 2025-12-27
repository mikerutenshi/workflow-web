import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsDate, Matches, Min, ValidateNested } from 'class-validator';
import { InvProductToSaleCreateDto } from './inv-product-to-sale-create.dto';

@InputType()
export class SaleCreateDto {
  @Field()
  @Matches(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/, {
    message: 'Format support example: SAL-251015-0001',
  })
  saleNo: string;

  @Field(() => Date)
  @IsDate()
  date: Date;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;

  @Field(() => [InvProductToSaleCreateDto])
  @Type(() => InvProductToSaleCreateDto)
  @ValidateNested({ each: true })
  saleProducts: InvProductToSaleCreateDto[];
}
