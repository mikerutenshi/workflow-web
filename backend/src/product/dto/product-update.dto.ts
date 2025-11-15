import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { ProductCreateDto } from './product-create.dto';
import { Transform } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

@InputType()
export class ProductUpdateDto extends PartialType(ProductCreateDto) {
  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  updatedBy: number;
}
