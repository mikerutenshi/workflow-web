import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

@InputType()
export class SizeToWorkDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  id: number;
  @Field()
  @IsInt()
  @Min(0)
  quantity: number;
}
