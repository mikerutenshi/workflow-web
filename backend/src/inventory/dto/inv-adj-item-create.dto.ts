import { AdjReason } from '@/generated/prisma/client';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEnum,
  IsInt,
  IsOptional,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { InvAdjItemSizeCreateDto } from './inv-adj-item-size-create.dto';

@InputType()
export class InvAdjItemCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productId!: number;

  @Field(() => AdjReason)
  @IsEnum(AdjReason)
  reason!: AdjReason;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(255)
  note?: string | null;

  @Field(() => [InvAdjItemSizeCreateDto])
  @Type(() => InvAdjItemSizeCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  invAdjItemSizes!: InvAdjItemSizeCreateDto[];
}
