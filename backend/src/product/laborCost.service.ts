import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateLaborCostDto } from './dto/createLaborCost.dto';
import { LaborCost } from '@/models/labor-cost.model';

@Injectable()
export class LaborCostService {
  constructor(private prisma: PrismaService) {}

  async createLaborCost(data: CreateLaborCostDto): Promise<LaborCost> {
    return await this.prisma.laborCost.create({
      data: {
        drawingUpper: data.drawingUpper,
        drawingLining: data.drawingLining,
        stitchingUpper: data.stitchingUpper,
        stitchingOutsole: data.stitchingOutsole,
        stitchingInsole: data.stitchingInsole,
        lasting: data.lasting,
        createdBy: +data.createdBy,
        productGroupId: +data.productGroupId,
      },
    });
  }

  async updateLaborCost(
    id: string,
    data: CreateLaborCostDto,
  ): Promise<LaborCost> {
    return await this.prisma.laborCost.update({
      where: {
        id: +id,
      },
      data: {
        drawingUpper: data.drawingUpper,
        drawingLining: data.drawingLining,
        stitchingUpper: data.stitchingUpper,
        stitchingOutsole: data.stitchingOutsole,
        stitchingInsole: data.stitchingInsole,
        lasting: data.lasting,
        createdBy: +data.createdBy,
        productGroupId: +data.productGroupId,
      },
    });
  }

  async getLaborCosts(): Promise<LaborCost[]> {
    return await this.prisma.laborCost.findMany({
      include: {
        productGroup: true,
      },
    });
  }
}
