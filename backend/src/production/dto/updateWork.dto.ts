import { SizeToWorkDto } from '@/production/dto/sizeToWork.dto';
import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsDate, IsInt, Min, ValidateNested } from 'class-validator';

@InputType()
export class UpdateWorkDto {
  @Field(() => Date)
  @IsDate()
  date: Date;

  @Field()
  @IsInt()
  orderNo: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  productId: number;

  @Field(() => [SizeToWorkDto])
  @Type(() => SizeToWorkDto)
  @ValidateNested({ each: true })
  sizes: SizeToWorkDto[];

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  createdBy: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy: number;
}
