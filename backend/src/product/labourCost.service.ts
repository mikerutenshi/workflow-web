import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { LabourCostDto } from './dto/labourCost.dto';
import { LabourCost } from '@/models/labour-cost.model';

@Injectable()
export class LabourCostService {
  constructor(private prisma: PrismaService) {}

  async createLabourCost(data: LabourCostDto): Promise<LabourCost> {
    return await this.prisma.labourCost.create({
      data: {
        skuNumeric: data.skuNumeric,
        drawingUpper: data.drawingUpper,
        drawingLining: data.drawingLining,
        stitchingUpper: data.stitchingUpper,
        stitchingOutsole: data.stitchingOutsole,
        stitchingInsole: data.stitchingInsole,
        lasting: data.lasting,
        createdBy: data.createdBy,
        productGroupId: data.productGroupId,
      },
      include: {
        productGroup: true,
      },
    });
  }

  async getLabourCosts(): Promise<LabourCost[]> {
    return await this.prisma.labourCost.findMany({
      include: {
        productGroup: true,
      },
    });
  }
}
