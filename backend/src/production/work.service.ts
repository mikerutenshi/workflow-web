import { Work } from '@/models/work.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/createWork.dto';
import { Size } from '@/models/size.model';
import { UpdateWorkDto } from './dto/updateWork.dto';
import { LaborCost } from '@/models/labor-cost.model';
import { Job } from '@prisma/client';
import { WorkWithTasks } from '@/models/workWithTasks.model';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}

  createWork(data: CreateWorkDto): Promise<Work> {
    return this.prisma.$transaction(async (tx) => {
      const work = await tx.work.create({
        data: {
          ...data,
          sizes: {
            create: data.sizes.map((size) => ({
              size: { connect: { id: size.id } },
              quantity: size.quantity,
            })),
          },
        },
        include: {
          product: {
            include: {
              productGroup: {
                include: {
                  laborCost: {
                    select: {
                      drawingUpper: true,
                      drawingLining: true,
                      stitchingUpper: true,
                      stitchingOutsole: true,
                      stitchingInsole: true,
                      lasting: true,
                    },
                  },
                },
              },
            },
          },
          sizes: {
            select: {
              size: true,
              quantity: true,
            },
          },
        },
      });

      await tx.task.create({
        data: {
          workId: work.id,
          type: Job.UPPER_DRAW,
          createdBy: data.createdBy,
        },
      });
      await tx.task.create({
        data: {
          workId: work.id,
          type: Job.LINING_DRAW,
          createdBy: data.createdBy,
        },
      });
      await tx.task.create({
        data: {
          workId: work.id,
          type: Job.uPPER_STITCH,
          createdBy: data.createdBy,
        },
      });
      await tx.task.create({
        data: {
          workId: work.id,
          type: Job.LAST,
          createdBy: data.createdBy,
        },
      });

      const outsoleStitch =
        work.product.productGroup.laborCost?.stitchingOutsole;
      const insoleStitch = work.product.productGroup.laborCost?.stitchingInsole;

      if (outsoleStitch) {
        await tx.task.create({
          data: {
            workId: work.id,
            type: Job.OUTSOLE_STITCH,
            createdBy: data.createdBy,
          },
        });
      }

      if (insoleStitch) {
        await tx.task.create({
          data: {
            workId: work.id,
            type: Job.INSOLE_STITCH,
            createdBy: data.createdBy,
          },
        });
      }

      return work;
    });
  }

  updateWork(id: number, data: UpdateWorkDto): Promise<Work> {
    return this.prisma.work.update({
      where: { id },
      data: {
        ...data,
        sizes: {
          deleteMany: { workId: id },
          create: data.sizes.map((size) => ({
            size: { connect: { id: size.id } },
            quantity: size.quantity,
          })),
        },
      },
      include: {
        sizes: {
          select: {
            size: true,
            quantity: true,
          },
        },
      },
    });
  }

  async getWork(id: number): Promise<WorkWithTasks> {
    const work = await this.prisma.work.findUnique({
      where: { id },
      include: {
        sizes: {
          select: {
            size: true,
            quantity: true,
          },
        },
        tasks: true,
      },
    });
    if (!work) {
      throw new Error(`Work with ID ${id} not found.`);
    }
    return work;
  }

  getWorks(): Promise<WorkWithTasks[]> {
    return this.prisma.work.findMany({
      include: {
        sizes: { select: { size: true, quantity: true } },
        tasks: true,
      },
    });
  }

  async deleteWork(id: number): Promise<Boolean> {
    const work = await this.prisma.work.delete({ where: { id } });

    if (!work) throw new Error(`Delete work with ID ${id} failed.`);
    return !!work;
  }
}
