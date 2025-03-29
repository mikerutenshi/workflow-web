import { Field, ID, InputType } from '@nestjs/graphql';
import { IsArray, IsInt, IsNotEmpty, Matches } from 'class-validator';

@InputType()
export class UpdateProductDto {
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
  updatedBy: string;

  @Field(() => [ID])
  @IsArray()
  @IsNotEmpty({ each: true })
  colorIds: string[];
}
