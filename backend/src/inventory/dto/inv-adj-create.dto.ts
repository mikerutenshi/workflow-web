import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsDate,
  IsInt,
  IsOptional,
  Matches,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';
import { InvAdjItemCreateDto } from './inv-adj-item-create.dto';

@InputType()
export class InvAdjCreateDto {
  @Field()
  @Matches(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/, {
    message: 'Format support example: ADJ-260824-0001',
  })
  adjNo!: string;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  invId!: number;

  @Field(() => Date)
  @IsDate()
  adjDate!: Date;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MaxLength(255)
  note?: string | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  createdBy!: number;

  @Field(() => [InvAdjItemCreateDto])
  @Type(() => InvAdjItemCreateDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  invAdjItems!: InvAdjItemCreateDto[];
}
