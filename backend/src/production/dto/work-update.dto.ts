import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { SizeToWorkCreateDto } from './size-to-work-create.dto';

@InputType()
export class WorkUpdateDto {
  @Field(() => Date)
  @IsDate()
  date: Date;

  @Field()
  @IsNotEmpty()
  orderNo: string;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  productId: number;

  @Field(() => [SizeToWorkCreateDto])
  @Type(() => SizeToWorkCreateDto)
  @ValidateNested({ each: true })
  workSizes: SizeToWorkCreateDto[];

  @Field(() => String, { nullable: true })
  @IsString()
  @MaxLength(255)
  @IsOptional()
  note?: string | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy: number;
}
