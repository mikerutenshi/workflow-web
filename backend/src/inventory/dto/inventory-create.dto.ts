import { Cities } from '@/models/cities.enum';
import { States } from '@/models/states.enum';
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
  @IsEnum(States)
  state: string;
}
