import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '@/generated/client';
import { IsEnum, IsNotEmpty } from 'class-validator';

@InputType()
export class ProductCategoryCreateDto {
  @Field()
  @IsNotEmpty()
  name: string;
  @Field()
  @IsEnum(Gender)
  gender: Gender;
}
