import { InvProduct } from '@/models/inv-product.model';
import { ProductGetDto } from '@/product/dto/product-get.dto';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InvProductDto extends InvProduct {
  @Field(() => ProductGetDto)
  product: ProductGetDto;
}
