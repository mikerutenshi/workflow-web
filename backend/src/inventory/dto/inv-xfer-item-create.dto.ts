import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform, Type } from 'class-transformer';
import { IsInt, Min, ValidateNested } from 'class-validator';
import { InvXferItemSizeCreateDto } from './inv-xfer-item-size-create.dto';

@InputType()
export class InvXferItemCreateDto {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(0)
  productId: number;

  @Field(() => [InvXferItemSizeCreateDto])
  @Type(() => InvXferItemSizeCreateDto)
  @ValidateNested({ each: true })
  invXferItemSizes: InvXferItemSizeCreateDto[];
}
