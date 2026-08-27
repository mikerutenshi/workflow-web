import { Progress } from '@/generated/prisma/enums';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { SizeToWorkCreateDto } from './size-to-work-create.dto';
import { IsEnum, IsInt, Min, ValidateNested } from 'class-validator';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class AddToInventoryDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  productId!: number;

  @Field(() => Progress)
  @IsEnum(Progress)
  progress!: Progress;

  @Field(() => [SizeToWorkCreateDto])
  @Type(() => SizeToWorkCreateDto)
  @ValidateNested({ each: true })
  workSizes!: SizeToWorkCreateDto[];

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  workId!: number;
}
