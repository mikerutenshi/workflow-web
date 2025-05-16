import { Args, Query, Resolver } from '@nestjs/graphql';
import { PayrollService } from './payroll.service';
import { PayrollGetDto } from './dto/payroll-get.dto';
import { UseGuards } from '@nestjs/common';
import { RoleGuard } from '@/guards/role.guard';
import { Role } from '@/models/role.enum';
import { Roles } from '@/guards/roles.decorator';

@Resolver()
@UseGuards(RoleGuard)
@Roles(Role.Finance)
export class PayrollResolver {
  constructor(private service: PayrollService) {}

  @Query(() => PayrollGetDto)
  getPayroll(
    @Args('startDate', { type: () => Date }) startDate: Date,
    @Args('endDate', { type: () => Date }) endDate: Date,
  ): Promise<PayrollGetDto> {
    return this.service.getPayroll(startDate, endDate);
  }
}
