import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateProductGroupDto {
  @Field()
  @IsInt()
  skuNumeric: number;
  @Field()
  @IsInt()
  productCategoryId: number;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name: string | null;
}
