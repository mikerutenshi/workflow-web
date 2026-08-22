import { Sale } from '@/models/sale.model';
import { Field, ObjectType } from '@nestjs/graphql';
import { SaleItemDto } from './sale-item.dto';

@ObjectType()
export class SaleDto extends Sale {
  @Field(() => [SaleItemDto])
  saleItems!: SaleItemDto[];
}
