import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDate,
  Matches,
  Min,
  ValidateNested,
} from 'class-validator';
import { SaleItemCreateDto } from './sale-item-create.dto';

@InputType()
export class SaleCreateDto {
  @Field()
  @Matches(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/, {
    message: 'Format support example: SAL-251015-0001',
  })
  saleNo!: string;

  @Field(() => Date)
  @IsDate()
  date!: Date;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy!: number;

  @Field(() => [SaleItemCreateDto])
  @Type(() => SaleItemCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  saleItems!: SaleItemCreateDto[];
}
