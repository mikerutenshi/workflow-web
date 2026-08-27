import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class ProductGroupCreateDto {
  @Field()
  @IsNotEmpty()
  @Matches(/^[0-9]{5}(ST)?$/, {
    message: 'Format support example: 12345 or 12345ST',
  })
  skuNumeric!: string;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productCategoryId!: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  name!: string | null;

  @Field(() => Number, { nullable: true })
  @IsInt()
  @IsOptional()
  @Min(100000)
  @Max(3000000)
  msrp?: number | null;
}
