import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { LaborCostUpsertDto } from './dto/labor-cost-upsert.dto';
import { LaborCost } from '@/models/labor-cost.model';

@Injectable()
export class LaborCostService {
  constructor(private prisma: PrismaService) {}

  async upsertLaborCosts(data: LaborCostUpsertDto[]): Promise<LaborCost[]> {
    const queries = data.map((item) => {
      const now = new Date();
      return this.prisma.laborCost.upsert({
        where: {
          productGroupId_type: {
            productGroupId: Number(item.productGroupId) ?? 0,
            type: item.type,
          },
        },
        create: {
          type: item.type,
          cost: item.cost,
          productGroupId: Number(item.productGroupId) ?? 0,
          createdBy: Number(item.createdBy) ?? 0,
        },
        update: {
          cost: item.cost,
          updatedBy: Number(item.updatedBy) ?? 0,
          updatedAt: now,
        },
      });
    });
    return await this.prisma.$transaction(queries);
  }

  async getLaborCosts(): Promise<LaborCost[]> {
    return await this.prisma.laborCost.findMany({
      include: {
        productGroup: true,
      },
    });
  }
}
