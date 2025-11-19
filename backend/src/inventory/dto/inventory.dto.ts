import { Inventory } from '@/models/inventory.model';
import { PriceFormula } from '@/models/price-formula.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InventoryDto extends Inventory {
  @Field(() => PriceFormula, { nullable: true })
  priceFormula?: PriceFormula | null;
}
