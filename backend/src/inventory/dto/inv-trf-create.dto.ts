import { Progress } from '@/generated/client';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, Matches, Min, ValidateNested } from 'class-validator';
import { InvTrfItemCreateDto } from './inv-trf-item-create.dto';

@InputType()
export class InvTrfCreateDto {
  @Field()
  @Matches(/^[A-Z]{2,3}-[0-9]{6}-[0-9]{4}$/, {
    message: 'Format support example: TRF-251015-0001',
  })
  trfNo: string;

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  fromInvId: number | null;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  toInvId: number;

  @Field(() => Date)
  @IsDate()
  trfDate?: Date;

  @Field(() => Progress)
  @IsEnum(Progress)
  progress: Progress;

  @Field(() => [InvTrfItemCreateDto])
  @Type(() => InvTrfItemCreateDto)
  @ValidateNested({ each: true })
  invTrfItems: InvTrfItemCreateDto[];

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;
}
