import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { InvTrfItemSizeCreateDto } from './inv-trf-item-size-create.dto';
import { Progress } from '@/generated/client';

@InputType()
export class InvTrfItemCreateDto {
  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  fromInvId: number | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  toInvId: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  productId: number;

  @Field(() => [InvTrfItemSizeCreateDto])
  @Type(() => InvTrfItemSizeCreateDto)
  @ValidateNested({ each: true })
  invTrfItemSizes: InvTrfItemSizeCreateDto[];

  @Field(() => Progress, { nullable: true })
  @IsEnum(Progress)
  @IsOptional()
  progress?: Progress;

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  workId?: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;
}
