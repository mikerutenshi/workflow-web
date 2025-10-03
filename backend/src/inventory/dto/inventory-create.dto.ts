import { InvType } from '@/generated/client';
import { Cities } from '@/models/cities.enum';
import { Provinces } from '@/models/provinces.enum';
import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty } from 'class-validator';

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
}
