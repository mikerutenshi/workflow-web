import { Field, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDate,
  Matches,
  ValidateNested,
} from 'class-validator';
import { SaleItemCreateDto } from './sale-item-create.dto';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
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

  @Field(() => [SaleItemCreateDto])
  @Type(() => SaleItemCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  saleItems!: SaleItemCreateDto[];
}
