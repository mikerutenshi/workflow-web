import { LaborCost } from '@/models/labor-cost.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LaborCostService } from './laborCost.service';
import { LaborCostUpsertDto } from './dto/labor-cost-upsert.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { LaborCostGetDto } from './dto/labor-cost-get.dto';
import { LaborCostUpdateDto } from './dto/labor-cost-update.dto';

@Resolver(() => LaborCost)
@UseGuards(RoleGuard)
@Roles(Role.Finance)
export class LaborCostResolver {
  constructor(private laborCostService: LaborCostService) {}

  @Mutation(() => [LaborCost])
  upsertLaborCosts(
    @Args('productGroupId', { type: () => ID }, ParseIntPipe)
    productGroupId: number,
    @Args('data', { type: () => [LaborCostUpsertDto] })
    data: LaborCostUpsertDto[],
  ): Promise<LaborCost[]> {
    return this.laborCostService.upsertLaborCosts(productGroupId, data);
  }

  @Mutation(() => Boolean)
  updateLaborCosts(
    @Args('data')
    data: LaborCostUpdateDto,
  ): Promise<Boolean> {
    return this.laborCostService.updateLaborCosts(data);
  }

  @Query(() => [LaborCostGetDto])
  getLaborCosts(): Promise<LaborCostGetDto[]> {
    return this.laborCostService.getLaborCosts();
  }

  @Query(() => LaborCostGetDto)
  getLaborCost(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<LaborCostGetDto> {
    return this.laborCostService.getLaborCost(id);
  }
}
