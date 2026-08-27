import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { SizeToWorkCreateDto } from './size-to-work-create.dto';

// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class WorkCreateDto {
  @Field(() => Date)
  @IsDate()
  date!: Date;

  @Field()
  @IsNotEmpty()
  orderNo!: string;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  productId!: number;

  @Field(() => [SizeToWorkCreateDto])
  @Type(() => SizeToWorkCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  workSizes!: SizeToWorkCreateDto[];

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  note!: string | null;
}
