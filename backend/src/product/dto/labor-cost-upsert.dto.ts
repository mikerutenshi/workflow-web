import { Field, ID, InputType } from '@nestjs/graphql';
import { Job } from '@/generated/prisma/client';
import { Transform } from 'class-transformer';
import { IsEnum, IsInt, Min } from 'class-validator';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class LaborCostUpsertDto {
  @Field(() => Job)
  @IsEnum(Job)
  type: Job;

  @Field()
  @IsInt()
  @Min(100)
  cost: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productGroupId: number;
}
