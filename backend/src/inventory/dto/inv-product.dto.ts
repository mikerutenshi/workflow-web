import { InvProduct } from '@/models/inv-product.model';
import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { ProductDto } from '@/product/dto/product.dto';
import { Field, Int, ObjectType } from '@nestjs/graphql';

/**
 * A pending transfer item as seen from the stock list. Carries the parent
 * transfer so the UI can name which transfers are holding stock in flight.
 */
@ObjectType()
export class InvProductTrfItemDto extends InvTrfItem {
  @Field(() => InvTrf, { nullable: true })
  invTrf?: InvTrf | null;
}

@ObjectType()
export class InvProductDto extends InvProduct {
  @Field(() => ProductDto)
  product!: ProductDto;

  @Field(() => [InvProductTrfItemDto])
  invTrfItems!: InvProductTrfItemDto[];

  @Field(() => Int, { nullable: true })
  price!: number | null;
}
