import { Field, ID, InputType } from '@nestjs/graphql';
import { Job } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEnum,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';

@InputType()
export class CreateArtisanDto {
  @Field()
  @IsAlphanumeric()
  firstName: string;
  @Field()
  @IsAlphanumeric()
  lastName: string;
  @Field()
  @IsEnum(Job, { each: true })
  jobs: Job[];
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
