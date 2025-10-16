import { InvTrfItem } from '@/models/inv-trf-item.model';
import { Product } from '@/models/product.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvTrfItemDto extends InvTrfItem {
  @Field(() => Product)
  product: Product;
}
