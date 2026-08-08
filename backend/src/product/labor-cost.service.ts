import { Job } from '@/generated/prisma/client';
import { LaborCost } from '@/models/labor-cost.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { LaborCostGetDto } from './dto/labor-cost-get.dto';
import { LaborCostUpdateDto } from './dto/labor-cost-update.dto';
import { LaborCostUpsertDto } from './dto/labor-cost-upsert.dto';

@Injectable()
export class LaborCostService {
  constructor(private prisma: PrismaService) {}

  async upsertLaborCosts(
    productGroupId: number,
    data: LaborCostUpsertDto[],
  ): Promise<LaborCost[]> {
    try {
      return this.prisma.$transaction(async (tx) => {
        const upsertCosts = [];

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

          for (const item of data) {
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

            upsertCosts.push(newCost);
          }
        }

        return upsertCosts;
      });
    } catch (err) {
      throw err;
    }
  }

  async updateLaborCosts(data: LaborCostUpdateDto): Promise<boolean> {
    const jobTypes: { key: keyof LaborCostUpdateDto; type: Job }[] = [
      { key: 'drawUpper', type: Job.DRAW_UPPER },
      { key: 'drawLining', type: Job.DRAW_LINING },
      { key: 'stitchUpper', type: Job.STITCH_UPPER },
      { key: 'stitchOutsole', type: Job.STITCH_OUTSOLE },
      { key: 'stitchInsole', type: Job.STITCH_INSOLE },
      { key: 'last', type: Job.LAST },
    ];

    try {
      await this.prisma.$transaction(async (tx) => {
        for (const { key, type } of jobTypes) {
          const cost = data[key];

          if (cost != null && cost !== undefined) {
            const newCost = await tx.laborCost.upsert({
              where: {
                productGroupId_type: {
                  productGroupId: data.productGroupId,
                  type,
                },
              },
              update: {
                productGroupId: data.productGroupId,
                createdBy: data.createdBy,
                updatedBy: data.updatedBy,
                type,
                cost,
              },
              create: {
                productGroupId: data.productGroupId,
                createdBy: data.createdBy,
                type,
                cost,
              },
            });

            const relatedWorks = await tx.work.findMany({
              where: { product: { productGroupId: data.productGroupId } },
            });

            for (const work of relatedWorks) {
              await tx.task.upsert({
                where: {
                  workId_type: {
                    workId: work.id,
                    type: type,
                  },
                },
                create: {
                  workId: work.id,
                  type: type,
                  laborCostId: newCost.id,
                  createdBy: data.createdBy,
                },
                update: {},
              });
            }
          } else {
            const laborCost = await tx.laborCost.findFirst({
              select: { id: true },
              where: {
                productGroupId: data.productGroupId,
                type,
              },
            });
            const laborCostId = laborCost?.id;

            if (laborCostId) {
              await tx.task.deleteMany({
                where: {
                  laborCostId,
                  artisanId: null,
                },
              });

              await tx.laborCost.delete({
                where: {
                  id: laborCostId,
                },
              });
            }
          }
        }
      });
    } catch (err) {
      throw err;
    }
    return true;
  }

  getLaborCosts(): Promise<LaborCostGetDto[]> {
    return this.prisma.productGroup.findMany({
      include: {
        productCategory: true,
        laborCosts: true,
      },
      orderBy: [{ productCategory: { gender: 'asc' } }, { skuNumeric: 'asc' }],
    });
  }

  async getLaborCost(id: number): Promise<LaborCostGetDto> {
    const result = await this.prisma.productGroup.findUnique({
      where: {
        id,
      },
      include: {
        productCategory: true,
        laborCosts: true,
      },
    });
    if (!result) {
      throw new Error(`Labor costs with ID ${id} not found.`);
    }
    return result;
  }
}
