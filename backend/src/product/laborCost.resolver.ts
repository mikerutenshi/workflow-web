import { LaborCost } from '@/models/labor-cost.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LaborCostService } from './laborCost.service';
import { LaborCostUpsertDto } from './dto/labor-cost-upsert.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => LaborCost)
export class LaborCostResolver {
  constructor(private laborCostService: LaborCostService) {}

  @Mutation(() => [LaborCost])
  upsertLaborCosts(
    @Args('data', { type: () => [LaborCostUpsertDto] })
    data: LaborCostUpsertDto[],
  ): Promise<LaborCost[]> {
    return this.laborCostService.upsertLaborCosts(data);
  }

  @Query(() => [LaborCost])
  getLaborCosts() {
    return this.laborCostService.getLaborCosts();
  }
}
