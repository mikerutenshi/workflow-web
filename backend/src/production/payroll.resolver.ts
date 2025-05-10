import { Args, Query, Resolver } from '@nestjs/graphql';
import { PayrollService } from './payroll.service';
import { PayrollGetDto } from './dto/payroll-get.dto';

@Resolver()
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
