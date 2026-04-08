import { InvType } from '@/generated/prisma/client';
import { Cities } from '@/models/cities.enum';
import { Provinces } from '@/models/provinces.enum';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { PriceFormulaCreateDto } from './price-formula-create.dto';

@InputType()
export class InventoryCreateDto {
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsNotEmpty()
  address: string;
  @Field()
  @IsEnum(Cities)
  city: string;
  @Field()
  @IsEnum(Provinces)
  province: string;
  @Field(() => InvType)
  @IsEnum(InvType)
  type: InvType;

  @Field(() => PriceFormulaCreateDto)
  @IsOptional()
  priceFormula: PriceFormulaCreateDto;
}
