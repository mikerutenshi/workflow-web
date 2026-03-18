import { InvTrfItem } from '@/models/inv-trf-item.model';
import { InvTrf } from '@/models/inv-trf.model';
import { ProductDto } from '@/product/dto/product.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvTrfItemDto extends InvTrfItem {
  @Field(() => ProductDto)
  product: ProductDto;

  @Field(() => InvTrf, { nullable: true })
  invTrf?: InvTrf | null;
}
