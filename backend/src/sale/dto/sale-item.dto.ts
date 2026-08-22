import { Inventory } from '@/models/inventory.model';
import { SaleItem } from '@/models/sale-item.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SaleItemDto extends SaleItem {
  @Field(() => Inventory)
  inventory!: Inventory;
}
