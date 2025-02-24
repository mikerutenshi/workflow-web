import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateProductGroupDto {
  @Field()
  skuNumeric: number;
  @Field()
  productCategoryId: number;
  @Field()
  name?: string;
}
