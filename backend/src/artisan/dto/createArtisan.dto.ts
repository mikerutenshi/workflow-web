import { Field, ID, InputType } from '@nestjs/graphql';
import { Job } from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsOptional,
  Matches,
  Min,
} from 'class-validator';

@InputType()
export class CreateArtisanDto {
  @Field()
  @Matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
  firstName: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
  lastName: string | undefined;
  @Field(() => [Job])
  @IsArray()
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
