import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { LaborCostUpsertDto } from './dto/labor-cost-upsert.dto';
import { LaborCost } from '@/models/labor-cost.model';

@Injectable()
export class LaborCostService {
  constructor(private prisma: PrismaService) {}

  async upsertLaborCosts(
    productGroupId: number,
    data: LaborCostUpsertDto[],
  ): Promise<LaborCost[]> {
    try {
      return this.prisma.$transaction(async (tx) => {
        let upsertCosts: Promise<LaborCost[]> = Promise.resolve([]);

        if (data.length == 0) {
          await tx.task.deleteMany({
            where: { work: { product: { productGroupId } } },
          });
          await tx.laborCost.deleteMany({ where: { productGroupId } });
        } else {
          let databaseCosts = await tx.laborCost.findMany({
            where: { productGroupId },
          });

          for (const databaseCost of databaseCosts) {
            let found = data.find((item) => item.type === databaseCost.type);
            if (!found) {
              await tx.task.deleteMany({
                where: { laborCostId: databaseCost.id },
              });
              await tx.laborCost.delete({ where: { id: databaseCost.id } });
            }
          }

          upsertCosts = Promise.all(
            data.map(async (item) => {
              const now = new Date();

              const newCost = await tx.laborCost.upsert({
                where: {
                  productGroupId_type: {
                    productGroupId: productGroupId,
                    type: item.type,
                  },
                },
                create: {
                  type: item.type,
                  cost: item.cost,
                  productGroupId: productGroupId,
                  createdBy: Number(item.createdBy) ?? 0,
                },
                update: {
                  cost: item.cost,
                  updatedBy: Number(item.updatedBy) ?? 0,
                  updatedAt: now,
                },
              });

              const relWorks = await tx.work.findMany({
                where: { product: { productGroupId } },
              });

              for (const work of relWorks) {
                await tx.task.upsert({
                  where: {
                    workId_type: {
                      workId: work.id,
                      type: item.type,
                    },
                  },
                  create: {
                    workId: work.id,
                    type: item.type,
                    laborCostId: newCost.id,
                    createdBy: Number(item.createdBy) ?? 0,
                  },
                  update: {},
                });
              }

              return newCost;
            }),
          );
        }

        return upsertCosts;
      });
    } catch (err) {
      console.log(`Error -> ${err}`);
      throw err;
    }
  }

  async getLaborCosts(): Promise<LaborCost[]> {
    return await this.prisma.laborCost.findMany({
      include: {
        productGroup: true,
      },
    });
  }
}
