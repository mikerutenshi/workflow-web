import { Field, InputType } from '@nestjs/graphql';
import { Job } from '@/generated/prisma/client';
import { IsArray, IsEnum, IsOptional, Matches } from 'class-validator';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class ArtisanCreateDto {
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
}
