import { WorkWithTasks } from '@/models/work-with-tasks.model';
import { Work } from '@/models/work.model';
import { Inject, Injectable } from '@nestjs/common';
import { WorkCreateDto } from './dto/work-create.dto';
import { WorkUpdateDto } from './dto/work-update.dto';
import { PrismaClient } from '@/generated/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class WorkService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  async createWork(data: WorkCreateDto): Promise<Work> {
    return this.prisma.client.$transaction(async (tx) => {
      const createdWork = await tx.work.create({
        data: {
          ...data,
          workSizes: {
            create: data.workSizes.map((size) => ({
              size: { connect: { id: size.id } },
              quantity: size.quantity,
            })),
          },
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
    return this.prisma.client.work.update({
      where: { id },
      data: {
        ...data,
        workSizes: {
          deleteMany: { workId: id },
          create: data.workSizes.map((size) => ({
            size: { connect: { id: size.id } },
            quantity: size.quantity,
          })),
        },
      },
    });
  }

  async getWork(id: number): Promise<WorkWithTasks> {
    const work = await this.prisma.client.work.findUnique({
      where: { id },
      include: {
        workSizes: {
          include: {
            size: true,
          },
          orderBy: [{ sizeId: 'asc' }],
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
    return this.prisma.client.work.findMany({
      include: {
        workSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
        tasks: { include: { artisan: true }, orderBy: { type: 'asc' } },
        product: true,
      },
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: [{ date: 'asc' }, { orderNo: 'asc' }],
    });
  }

  async deleteWork(id: number): Promise<Boolean> {
    const work = await this.prisma.client.work.delete({ where: { id } });

    if (!work) throw new Error(`Delete work with ID ${id} failed.`);
    return !!work;
  }
}
