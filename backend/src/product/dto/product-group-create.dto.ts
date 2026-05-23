import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

@InputType()
export class ProductGroupCreateDto {
  @Field()
  @IsNotEmpty()
  @Matches(/^[0-9]{5}(ST)?$/, {
    message: 'Format support example: 12345 or 12345ST',
  })
  skuNumeric: string;
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productCategoryId: number;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name: string | null;
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  createdBy: number;
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy: number | undefined;
}
