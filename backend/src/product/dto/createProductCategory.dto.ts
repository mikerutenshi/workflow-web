import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import { IsEnum } from 'class-validator';

@InputType()
export class CreateProductCategoryDto {
  @Field()
  name: string;
  @Field()
  @IsEnum(Gender)
  gender: Gender;
}
