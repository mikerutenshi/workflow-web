import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';
import { ProductGroupCreateDto } from './product-group-create.dto';

@InputType()
export class ProductGroupUpdateDto extends PartialType(ProductGroupCreateDto) {
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy!: number;
}
