import { LaborCost } from '@/models/labor-cost.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LaborCostService } from './labor-cost.service';
import { LaborCostUpsertDto } from './dto/labor-cost-upsert.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/guards/current-user.decorator';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { User } from '@/models/user.model';
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
    @CurrentUser() user: User,
  ): Promise<LaborCost[]> {
    return this.laborCostService.upsertLaborCosts(productGroupId, data, user);
  }

  @Mutation(() => Boolean)
  updateLaborCosts(
    @Args('data')
    data: LaborCostUpdateDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.laborCostService.updateLaborCosts(data, user);
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
