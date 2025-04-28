import { Field, InputType } from '@nestjs/graphql';
import { IsHexColor, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class ColorCreateDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsHexColor()
  hexCode: string;
}
