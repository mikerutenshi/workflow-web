import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductGroupDto {
  @Field()
  @IsNotEmpty()
  skuNumeric: string;
  @Field()
  @IsNotEmpty()
  productCategoryId: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name: string | null;
}
