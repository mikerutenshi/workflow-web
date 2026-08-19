import { Gender } from '@/generated/prisma/enums';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SalePerformanceDto {
  @Field(() => ID)
  productId!: number;

  @Field()
  sku!: string;

  @Field()
  productGroupName!: string;

  @Field()
  productCategoryName!: string;

  @Field()
  gender!: Gender;

  @Field()
  totalQuantity!: number;
}
