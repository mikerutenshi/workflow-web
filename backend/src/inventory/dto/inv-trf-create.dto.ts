import { Progress } from '@/generated/prisma/client';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  Min,
} from 'class-validator';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class InvTrfCreateDto {
  @Field()
  @Matches(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/, {
    message: 'Format support example: TRF-251015-0001',
  })
  trfNo!: string;

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  fromInvId!: number | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  toInvId!: number;

  @Field(() => Date)
  @IsDate()
  trfDate!: Date;

  @Field(() => Progress)
  @IsEnum(Progress)
  progress!: Progress;

  @Field(() => [ID])
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v, 10));
    }
    return [];
  })
  @IsInt({ each: true })
  @Min(1, { each: true })
  invTrfItemIds!: number[];

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @IsOptional()
  workId?: number;

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  note!: string | null;
}
