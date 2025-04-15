import { Work } from '@/models/work.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateWorkDto } from './dto/createWork.dto';
import { Size } from '@/models/size.model';
import { UpdateWorkDto } from './dto/updateWork.dto';

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}

  createWork(data: CreateWorkDto): Promise<Work> {
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
        sizes: {
          select: {
            size: true,
            quantity: true,
          },
        },
      },
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

  async getWork(id: number): Promise<Work> {
    const work = await this.prisma.work.findUnique({
      where: { id },
      include: {
        sizes: {
          select: {
            size: true,
            quantity: true,
          },
        },
      },
    });
    if (!work) {
      throw new Error(`Work with ID ${id} not found.`);
    }
    return work;
  }

  getWorks(): Promise<Work[]> {
    return this.prisma.work.findMany({
      include: { sizes: { select: { size: true, quantity: true } } },
    });
  }

  async deleteWork(id: number): Promise<Boolean> {
    const work = this.prisma.work.delete({ where: { id } });

    if (!work) throw new Error(`Delete work with ID ${id} failed.`);
    return true;
  }
}
