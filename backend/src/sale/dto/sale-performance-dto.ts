import { Gender } from '@/generated/prisma/enums';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SalePerformanceDto {
  @Field(() => ID)
  productId!: number;

  @Field()
  sku!: string;

  @Field(() => String, { nullable: true })
  productGroupName!: string | null;

  @Field()
  productCategoryName!: string;

  @Field(() => Gender)
  gender!: Gender;

  @Field()
  totalQuantity!: number;
}
