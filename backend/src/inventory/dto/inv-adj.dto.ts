import { InvAdjItem } from '@/models/inv-adj-item.model';
import { InvAdj } from '@/models/inv-adj.model';
import { Inventory } from '@/models/inventory.model';
import { Product } from '@/models/product.model';
import { Field, Int, ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class InvAdjItemDto extends InvAdjItem {
  @Field(() => Product)
  product!: Product;
}

@ObjectType()
export class InvAdjDto extends InvAdj {
  @Field(() => Inventory)
  inventory!: Inventory;

  @Field(() => [InvAdjItemDto])
  invAdjItems!: InvAdjItemDto[];
}

/**
 * List view: the document header without its item set, plus the two aggregates
 * the table shows.
 */
@ObjectType()
export class InvAdjSimpleDto extends OmitType(InvAdjDto, ['invAdjItems']) {
  @Field(() => Int)
  itemCount!: number;

  /** Sum of (countedQty - systemQty) across every size of every item. */
  @Field(() => Int)
  totalVariance!: number;
}
