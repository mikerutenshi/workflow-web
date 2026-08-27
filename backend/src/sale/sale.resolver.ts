import { Sale } from '@/models/sale.model';
import { SaleService } from './sale.service';
import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { SaleCreateDto } from './dto/sale-create.dto';
import { SaleDto } from './dto/sale.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { SalePerformanceDto } from './dto/sale-performance-dto';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { CurrentUser } from '@/guards/current-user.decorator';
import { RolesAny } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { User } from '@/models/user.model';

@Resolver(() => Sale)
export class SaleResolver {
  constructor(private service: SaleService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Mutation(() => Sale)
  createSale(
    @Args('data') data: SaleCreateDto,
    @CurrentUser() user: User,
  ): Promise<Sale> {
    return this.service.createSale(data, user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [SaleDto])
  getSales(
    @Args(
      'invId',
      { type: () => ID, nullable: true },
      new ParseIntPipe({ optional: true }),
    )
    invId?: number,
    @Args('startDate', { type: () => Date, nullable: true })
    startDate?: Date,
    @Args('endDate', { type: () => Date, nullable: true })
    endDate?: Date,
  ): Promise<SaleDto[]> {
    return this.service.getSales(invId, startDate, endDate);
  }

  @UseGuards(AuthGuard)
  @Query(() => SaleDto)
  getSale(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<SaleDto> {
    return this.service.getSale(id);
  }

  @UseGuards(AuthGuard)
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

  @UseGuards(AuthGuard)
  @Query(() => String)
  generateSaleNo(
    @Args('date', { type: () => Date }) date: Date,
  ): Promise<string> {
    return this.service.generateSaleNo(date);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @RolesAny(Role.Superuser, Role.Finance, Role.Planner, Role.Sales)
  @Mutation(() => Boolean)
  deleteSale(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteSale(id);
  }
}
