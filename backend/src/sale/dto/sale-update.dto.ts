import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { SaleCreateDto } from './sale-create.dto';
import { ArrayNotEmpty, IsInt, Min, ValidateNested } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { SaleItemCreateDto } from './sale-item-create.dto';

@InputType()
export class SaleUpdateDto extends PartialType(SaleCreateDto) {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy!: number;

  @Field(() => [SaleItemCreateDto])
  @Type(() => SaleItemCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  saleItems!: SaleItemCreateDto[];
}
