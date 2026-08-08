import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsEnum, Min } from 'class-validator';
import { Progress } from '@/generated/prisma/client';

@InputType()
export class InvTrfUpdateProgressDto {
  @Field(() => Progress)
  @IsEnum(Progress)
  progress!: Progress;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy!: number;
}
