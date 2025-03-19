import { Field, InputType } from '@nestjs/graphql';
import { IsArray, IsInt, IsOptional, Matches } from 'class-validator';

@InputType()
export class CreateProductDto {
  @Field()
  @Matches(/^[A-Z]{1,2}\d{5}-[a-zA-Z.]+(\/[a-zA-Z.]+)*$/, {
    message: 'Format support example: A12345-D.Brown/White',
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
  @Field(() => [Number])
  @IsArray()
  @IsInt({ each: true })
  colorIds: number[];
}
