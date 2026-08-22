import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from './base.model';
import { SaleItem } from './sale-item.model';

@ObjectType()
export class Sale extends BaseModel {
  @Field()
  saleNo!: string;

  @Field(() => Date)
  date?: Date;

  @Field(() => [SaleItem])
  saleItems!: SaleItem[];
}
