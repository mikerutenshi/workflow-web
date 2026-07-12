import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsArray, IsInt, IsOptional, Matches, Max, Min } from 'class-validator';

@InputType()
export class ProductCreateDto {
  @Field()
  @Matches(/^[A-Z]{1,2}[A-Za-z0-9]{5,7}-[a-zA-Z.\s]+(\/[a-zA-Z.\s]*)*$/, {
    message: 'Format support example: A12345-D.Brown/White',
  })
  sku!: string;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productGroupId!: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  createdBy!: number;

  @Field(() => [ID])
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((v) => parseInt(v, 10)) : value,
  )
  @IsArray()
  @IsInt({ each: true })
  @Min(1, { each: true })
  colorIds!: number[];

  // @Field(() => Number, { nullable: true })
  // @IsInt()
  // @IsOptional()
  // @Min(99900)
  // @Max(2999900)
  // msrp?: number;
}
