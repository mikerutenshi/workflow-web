import { Field, InputType } from '@nestjs/graphql';
import { IsBoolean, IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class TagCreateDto {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  archived: boolean;
}
