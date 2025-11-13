import { Progress } from '@/generated/client';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  Matches,
  Min,
} from 'class-validator';

@InputType()
export class InvTrfCreateDto {
  @Field()
  @Matches(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/, {
    message: 'Format support example: TRF-251015-0001',
  })
  trfNo: string;

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  fromInvId: number | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  toInvId: number;

  @Field(() => Date)
  @IsDate()
  trfDate?: Date;

  @Field(() => Progress)
  @IsEnum(Progress)
  @IsOptional()
  progress?: Progress;

  @Field(() => [ID])
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v, 10));
    }
    return [];
  })
  @IsInt({ each: true })
  @Min(1, { each: true })
  invTrfItemIds: number[];

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @IsOptional()
  workId?: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;
}
