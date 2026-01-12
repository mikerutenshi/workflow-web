import { Sale } from '@/models/sale.model';
import { SaleService } from './sale.service';
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SaleCreateDto } from './dto/sale-create.dto';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private service: SaleService) {}

  @Mutation(() => Sale)
  createSale(@Args('data') data: SaleCreateDto): Promise<Sale> {
    return this.service.createSale(data);
  }

  @Query(() => [Sale])
  getSales(): Promise<Sale[]> {
    return this.service.getSales();
  }

  @Query(() => String)
  generateSaleNo(): Promise<String> {
    return this.service.generateSaleNo();
  }
}
