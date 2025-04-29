import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PayrollGetDto } from './dto/payroll-get.dto';
import { Product } from '@/models/product.model';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  getPayroll(): Promise<PayrollGetDto[]> {
    return this.prisma.artisan.findMany({
      include: {
        tasks: {
          include: {
            work: {
              include: {
                sizes: { include: { size: true } },
                product: {
                  include: {
                    productGroup: {
                      include: { productCategory: true, laborCosts: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  getPayrollSummary() {
    const result = this.prisma.task.groupBy({ by: ['artisanId'] });
    return result;
  }
}
