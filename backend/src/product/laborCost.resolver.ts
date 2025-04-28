import { LaborCost } from '@/models/labor-cost.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LaborCostService } from './laborCost.service';
import { LaborCostCreateDto } from './dto/labor-cost-create.dto';
import { ParseIntPipe } from '@nestjs/common';

@Resolver(() => LaborCost)
export class LaborCostResolver {
  constructor(private laborCostService: LaborCostService) {}

  @Mutation(() => LaborCost)
  createLaborCost(@Args('data') data: LaborCostCreateDto): Promise<LaborCost> {
    return this.laborCostService.createLaborCost(data);
  }

  @Mutation(() => LaborCost)
  updateLaborCost(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: LaborCostCreateDto,
  ): Promise<LaborCost> {
    return this.laborCostService.updateLaborCost(id, data);
  }

  @Query(() => [LaborCost])
  getLaborCosts() {
    return this.laborCostService.getLaborCosts();
  }
}
