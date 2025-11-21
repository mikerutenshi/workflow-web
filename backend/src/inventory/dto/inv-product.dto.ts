import { InvProduct } from '@/models/inv-product.model';
import { InvTrfItem } from '@/models/inv-trf-item.model';
import { ProductGetDto } from '@/product/dto/product-get.dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvProductDto extends InvProduct {
  @Field(() => ProductGetDto)
  product: ProductGetDto;

  @Field(() => [InvTrfItem])
  invTrfItems: InvTrfItem[];

  @Field(() => Int, { nullable: true })
  price?: number | null;
}
