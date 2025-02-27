import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsInt, IsOptional, Matches } from 'class-validator';

@InputType()
export class ProductDto {
  @Field()
  @Matches(/^[A-Z]{1,2}\d{5}-\w+(\/\w+)*$/, {
    message: 'Format support example: A12345-black/white',
  })
  sku: string;
  @Field()
  @IsInt()
  productGroupId: number;
  @Field()
  @IsInt()
  createdBy: number;
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  updatedBy?: number | null;
  @Field(() => Number)
  @IsArray()
  @IsInt({ each: true })
  colorIds: number[];
}
