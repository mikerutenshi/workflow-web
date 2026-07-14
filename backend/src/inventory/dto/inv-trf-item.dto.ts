import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { Product } from '@/models/product.model';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvTrfItemDto extends InvTrfItem {
  @Field(() => Product)
  product!: Product;

  @Field(() => InvTrf, { nullable: true })
  invTrf?: InvTrf | null;

  @Field(() => Int, { nullable: true })
  price!: number | null;
}
