import { Field, ID, InputType, Int } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

@InputType()
export class InvProductToSizeCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  sizeId: number;

  @Field()
  @IsInt()
  @Min(0)
  quantity: number;
}
