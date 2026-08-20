import { Sale } from '@/models/sale.model';
import { SaleService } from './sale.service';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { SaleCreateDto } from './dto/sale-create.dto';
import { ParseIntPipe } from '@nestjs/common';
import { SaleUpdateDto } from './dto/sale-update.dto';
import { SalePerformanceDto } from './dto/sale-performance-dto';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private service: SaleService) {}

  @Mutation(() => Sale)
  createSale(@Args('data') data: SaleCreateDto): Promise<Sale> {
    return this.service.createSale(data);
  }

  @Mutation(() => Sale)
  updateSale(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: SaleUpdateDto,
  ): Promise<Sale> {
    return this.service.updateSale(id, data);
  }

  @Query(() => [Sale])
  getSales(
    @Args(
      'invId',
      { type: () => ID, nullable: true },
      new ParseIntPipe({ optional: true }),
    )
    invId?: number,
  ): Promise<Sale[]> {
    return this.service.getSales(invId);
  }

  @Query(() => Sale)
  getSale(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Sale> {
    return this.service.getSale(id);
  }

  @Query(() => [SalePerformanceDto])
  getSalePerformance(
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
    @Args(
      'invId',
      { type: () => ID, nullable: true },
      new ParseIntPipe({ optional: true }),
    )
    invId?: number,
  ): Promise<SalePerformanceDto[]> {
    return this.service.getSalesPerformance(startDate, endDate, invId);
  }

  @Query(() => String)
  generateSaleNo(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<String> {
    return this.service.generateSaleNo(date);
  }

  @Mutation(() => Boolean)
  deleteSale(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.service.deleteSale(id);
  }
}
