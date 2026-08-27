import { WorkAndTasksDto } from '@/production/dto/work-and-tasks.dto';
import { Work } from '@/models/work.model';
import { User } from '@/models/user.model';
import { Operation } from '@/models/operation.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { generateId, getStartOfDay } from '@/utils/functions.util';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { WorkCreateDto } from './dto/work-create.dto';
import { WorkUpdateDto } from './dto/work-update.dto';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}

  async createWork(data: WorkCreateDto, user: User): Promise<Work> {
    return this.prisma.$transaction(async (tx) => {
      const createdWork = await tx.work.create({
        data: {
          ...data,
          createdBy: user.id,
          workSizes: data.workSizes
            ? {
                create: data.workSizes.map((size) => ({
                  size: { connect: { id: size.id } },
                  quantity: size.quantity,
                })),
              }
            : undefined,
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
              createdBy: user.id,
            },
          });
        }
      }

      return createdWork;
    });
  }

  updateWork(id: number, data: WorkUpdateDto, user: User): Promise<Work> {
    return this.prisma.work.update({
      where: { id },
      data: {
        ...data,
        updatedBy: user.id,
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

  async getWork(id: number): Promise<WorkAndTasksDto> {
    const work = await this.prisma.work.findUnique({
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

  getWorks(startDate: Date, endDate: Date): Promise<WorkAndTasksDto[]> {
    return this.prisma.work.findMany({
      include: {
        workSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
        tasks: { include: { artisan: true }, orderBy: { type: 'asc' } },
        product: true,
        invTrf: true,
      },
      where: {
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
      orderBy: [{ date: 'desc' }, { orderNo: 'desc' }],
    });
  }

  async deleteWork(id: number): Promise<boolean> {
    const work = await this.prisma.work.delete({ where: { id } });

    if (!work) throw new Error(`Delete work with ID ${id} failed.`);
    return !!work;
  }

  async generateOrderNo(date: Date): Promise<string> {
    const startOfDay = getStartOfDay(date);
    const oneDayMore = dayjs(startOfDay).add(1, 'day').toDate();

    const lastWork = await this.prisma.work.findFirst({
      orderBy: { orderNo: 'desc' },
      where: {
        date: {
          gte: startOfDay,
          lt: oneDayMore,
        },
      },
    });
    const lastOrderNo = lastWork?.orderNo;

    return generateId(Operation.Work, lastOrderNo, date);
  }
}
