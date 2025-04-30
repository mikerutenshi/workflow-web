import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PayrollGetDto } from './dto/payroll-get.dto';
import { Product } from '@/models/product.model';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async getPayroll(): Promise<PayrollGetDto[]> {
    const artisans = await this.prisma.artisan.findMany({
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

    let payroll: PayrollGetDto[] = [];
    payroll = artisans.map((artisan) => {
      return {
        ...artisan,
        tasks: artisan.tasks.map((task) => {
          const totalQuantity = task.work.sizes.reduce(
            (sum, workSize) => sum + workSize.quantity,
            0,
          );
          const taskCost =
            task.work.product.productGroup.laborCosts.find(
              (laborCost) => laborCost.type === task.type,
            )?.cost || 0;

          const payable = totalQuantity * taskCost;
          return {
            ...task,
            totalQuantity,
            taskCost,
            payable,
          };
        }),
        totalPayable: 0,
      };
    });

    for (const artisan of payroll) {
      artisan.totalPayable = artisan.tasks.reduce(
        (sum, task) => sum + task.payable,
        0,
      );
    }

    return payroll;
  }

  getPayrollSummary() {
    const result = this.prisma.task.groupBy({ by: ['artisanId'] });
    return result;
  }
}
