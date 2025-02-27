import { LabourCost } from '@/models/labour-cost.model';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LabourCostService } from './labourCost.service';
import { LabourCostDto } from './dto/labourCost.dto';

@Resolver(() => LabourCost)
export class LabourCostResolver {
  constructor(private labourCostService: LabourCostService) {}

  @Mutation(() => LabourCost)
  createLabourCost(@Args('data') data: LabourCostDto): Promise<LabourCost> {
    return this.labourCostService.createLabourCost(data);
  }

  @Query(() => [LabourCost])
  getLabourCosts() {
    return this.labourCostService.getLabourCosts();
  }
}
