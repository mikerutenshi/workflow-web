import { Field, InputType } from '@nestjs/graphql';
import { Matches } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  productGroupId: number;
  @Field()
  productCategoryId: number;
  @Field()
  @Matches(/^[A-Z]{1,2}\d{5}-\w+(\/\w+)*$/, {
    message: 'Format support example: A12345-black/white',
  })
  sku: string;
  @Field()
  name?: string;
  @Field()
  createdBy: number;
  @Field()
  colorIds: number[];
}
