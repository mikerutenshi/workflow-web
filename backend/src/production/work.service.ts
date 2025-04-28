import { Work } from '@/models/work.model';
import { WorkWithTasks } from '@/models/work-with-tasks.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { WorkCreateDto } from './dto/work-create.dto';
import { WorkUpdateDto } from './dto/work-update.dto';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}

  createWork(data: WorkCreateDto): Promise<Work> {
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
            include: { size: true },
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
          type: Job.UPPER_STITCH,
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

  updateWork(id: number, data: WorkUpdateDto): Promise<Work> {
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
          include: {
            size: true,
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
          include: {
            size: true,
          },
        },
        tasks: { include: { artisan: true } },
        product: true,
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
        sizes: { include: { size: true } },
        tasks: { include: { artisan: true } },
        product: true,
      },
    });
  }

  async deleteWork(id: number): Promise<Boolean> {
    const work = await this.prisma.work.delete({ where: { id } });

    if (!work) throw new Error(`Delete work with ID ${id} failed.`);
    return !!work;
  }
}
