import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, IsOptional, Min } from 'class-validator';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class LaborCostUpdateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productGroupId: number;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  drawUpper?: number | null;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  drawLining?: number | null;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  stitchUpper?: number | null;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  stitchOutsole?: number | null;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  stitchInsole?: number | null;

  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  @Min(100)
  last?: number | null;
}
