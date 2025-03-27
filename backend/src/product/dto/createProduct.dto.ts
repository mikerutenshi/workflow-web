import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @Matches(/^[A-Z]{1,2}\d{5}-[a-zA-Z.]+(\/[a-zA-Z.]+)*$/, {
    message: 'Format support example: A12345-D.Brown/White',
  })
  sku: string;

  @Field(() => ID)
  @IsNotEmpty()
  productGroupId: string;

  @Field(() => ID)
  @IsNotEmpty()
  createdBy: string;

  @Field(() => [ID])
  @IsArray()
  @IsNotEmpty({ each: true })
  colorIds: string[];
}
