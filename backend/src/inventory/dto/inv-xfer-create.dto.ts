import { Progress } from '@/generated/client';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsEnum, Min, ValidateNested } from 'class-validator';
import { InvXferItemCreateDto } from './inv-xfer-item-create.dto';

@InputType()
export class InvXferCreateDto {
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
  xferDate?: Date;

  @Field(() => Progress)
  @IsEnum(Progress)
  progress: Progress;

  @Field(() => [InvXferItemCreateDto])
  @Type(() => InvXferItemCreateDto)
  @ValidateNested({ each: true })
  invXferItems: InvXferItemCreateDto[];

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;
}
