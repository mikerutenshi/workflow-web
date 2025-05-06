import { Field, InputType } from '@nestjs/graphql';
import { Gender } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class SizeCreateDto {
  @Field()
  @IsNotEmpty()
  eu: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  us: string | undefined;
  @Field(() => String, { nullable: true })
  @IsOptional()
  uk: string | undefined;
  @Field(() => String, { nullable: true })
  @IsOptional()
  jp: string | undefined;
  @Field(() => Gender)
  @IsEnum(Gender)
  gender: Gender;
}
