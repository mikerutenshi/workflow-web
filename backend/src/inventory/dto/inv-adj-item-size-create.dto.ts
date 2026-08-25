import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

@InputType()
export class InvAdjItemSizeCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  sizeId!: number;

  // The available figure shown to the counter, snapshotted at count time.
  @Field()
  @IsInt()
  @Min(0)
  systemQty!: number;

  // What was physically found. Zero is meaningful here: "counted, none present".
  @Field()
  @IsInt()
  @Min(0)
  countedQty!: number;
}
