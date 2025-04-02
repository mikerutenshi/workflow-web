import { LaborCost } from '@/models/labor-cost.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LaborCostService } from './laborCost.service';
import { CreateLaborCostDto } from './dto/createLaborCost.dto';

@Resolver(() => LaborCost)
export class LaborCostResolver {
  constructor(private laborCostService: LaborCostService) {}

  @Mutation(() => LaborCost)
  createLaborCost(@Args('data') data: CreateLaborCostDto): Promise<LaborCost> {
    return this.laborCostService.createLaborCost(data);
  }

  @Query(() => [LaborCost])
  getLaborCosts() {
    return this.laborCostService.getLaborCosts();
  }
}
