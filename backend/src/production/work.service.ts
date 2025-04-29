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
    return this.prisma.work.create({
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
