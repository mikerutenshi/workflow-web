import { Field, InputType } from '@nestjs/graphql';
import { IsHexColor, IsString } from 'class-validator';

@InputType()
export class ColorDto {
  @Field()
  @IsString()
  name: string;
  @Field()
  @IsHexColor()
  hexCode: string;
}
