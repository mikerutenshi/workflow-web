import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { PayrollGetDto } from './dto/payroll-get.dto';
import { Product } from '@/models/product.model';

@Injectable()
export class PayrollService {
  constructor(private prisma: PrismaService) {}

  async getPayroll(startDate: Date, endDate: Date): Promise<PayrollGetDto> {
    const artisans = await this.prisma.artisan.findMany({
      include: {
        tasks: {
          where: {
            doneAt: {
              gte: startDate,
              lte: endDate,
            },
          },
          include: {
            laborCost: true,
            work: {
              include: {
                sizes: { include: { size: true } },
                product: true,
                // {
                // include: {
                //   productGroup: {
                //     include: { productCategory: true, laborCosts: true },
                //   },
                // },
                // },
              },
            },
          },
          orderBy: [{ type: 'asc' }, { doneAt: 'asc' }],
        },
      },
      where: {
        tasks: {
          some: {
            doneAt: {
              gte: startDate,
              lte: endDate,
            },
          },
        },
      },
      orderBy: { firstName: 'asc' },
    });

    let payroll: PayrollGetDto = new PayrollGetDto();

    payroll.artisans = artisans.map((artisan) => {
      return {
        ...artisan,
        tasks: artisan.tasks.map((task) => {
          const quantityPerTask = task.work.sizes.reduce(
            (sum, workSize) => sum + workSize.quantity,
            0,
          );
          const costPerTask = task.laborCost.cost;
          // const costPerTask =
          //   task.work.product.productGroup.laborCosts.find(
          //     (laborCost) => laborCost.type === task.type,
          //   )?.cost || 0;

          const payablePerTask = quantityPerTask * costPerTask;

          return {
            ...task,
            quantityPerTask,
            costPerTask,
            payablePerTask,
          };
        }),
        payablePerArtisan: 0,
        quantityPerArtisan: 0,
      };
    });

    for (const artisan of payroll.artisans) {
      artisan.payablePerArtisan =
        Math.round(
          artisan.tasks.reduce((sum, task) => sum + task.payablePerTask, 0) /
            1000,
        ) * 1000;
      artisan.quantityPerArtisan = artisan.tasks.reduce(
        (sum, task) => sum + task.quantityPerTask,
        0,
      );
    }

    payroll.totalPayable = payroll.artisans.reduce(
      (sum, artisan) => sum + artisan.payablePerArtisan,
      0,
    );
    payroll.totalQuantity = payroll.artisans.reduce(
      (sum, artisan) => sum + artisan.quantityPerArtisan,
      0,
    );

    return payroll;
  }

  getPayrollSummary() {
    const result = this.prisma.task.groupBy({ by: ['artisanId'] });
    return result;
  }
}
