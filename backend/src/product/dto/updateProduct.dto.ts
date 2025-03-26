import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsInt, Matches } from 'class-validator';

@InputType()
export class UpdateProductDto {
  @Field()
  @Matches(/^[A-Z]{1,2}\d{5}-[a-zA-Z.]+(\/[a-zA-Z.]+)*$/, {
    message: 'Format support example: A12345-D.Brown/White',
  })
  sku: string;

  @Field()
  @IsInt()
  productGroupId: number;

  @Field(() => Number, { nullable: true })
  @IsInt()
  updatedBy: number;

  @Field(() => [Number])
  @IsArray()
  @IsInt({ each: true })
  colorIds: number[];
}
