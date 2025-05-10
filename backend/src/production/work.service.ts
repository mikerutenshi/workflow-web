import { WorkWithTasks } from '@/models/work-with-tasks.model';
import { Work } from '@/models/work.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { WorkCreateDto } from './dto/work-create.dto';
import { WorkUpdateDto } from './dto/work-update.dto';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}

  async createWork(data: WorkCreateDto): Promise<Work> {
    return this.prisma.$transaction(async (tx) => {
      const createdWork = await tx.work.create({
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
          sizes: { include: { size: true } },
        },
      });

      const laborCosts = await tx.laborCost.findMany({
        where: {
          productGroup: {
            products: {
              some: {
                id: data.productId,
              },
            },
          },
        },
        relationLoadStrategy: 'join',
      });

      if (laborCosts.length > 0) {
        for (const laborCost of laborCosts) {
          await tx.task.create({
            data: {
              workId: createdWork.id,
              type: laborCost.type,
              laborCostId: laborCost.id,
              createdBy: data.createdBy,
            },
          });
        }
      }

      return createdWork;
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
          orderBy: { size: { eu: 'asc' } },
        },
        tasks: { include: { artisan: true }, orderBy: { type: 'asc' } },
        product: true,
      },
    });
    if (!work) {
      throw new Error(`Work with ID ${id} not found.`);
    }
    return work;
  }

  getWorks(startDate: Date, endDate: Date): Promise<WorkWithTasks[]> {
    return this.prisma.work.findMany({
      include: {
        sizes: { include: { size: true }, orderBy: { size: { eu: 'asc' } } },
        tasks: { include: { artisan: true }, orderBy: { type: 'asc' } },
        product: true,
      },
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });
  }

  async deleteWork(id: number): Promise<Boolean> {
    const work = await this.prisma.work.delete({ where: { id } });

    if (!work) throw new Error(`Delete work with ID ${id} failed.`);
    return !!work;
  }
}
