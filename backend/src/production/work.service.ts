import { WorkAndTasksDto } from '@/production/dto/work-and-tasks.dto';
import { Tag } from '@/models/tag.model';
import { Work } from '@/models/work.model';
import { User } from '@/models/user.model';
import { Operation } from '@/models/operation.enum';
import { PrismaService } from '@/prisma/prisma.service';
import { generateId, getStartOfDay } from '@/utils/functions.util';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { WorkCreateDto } from './dto/work-create.dto';
import { WorkUpdateDto } from './dto/work-update.dto';

// TagToWork has no payload of its own, so the join is flattened away before it
// reaches GraphQL, matching how auth.service.ts unwraps userInventories.
function flattenTags<T extends { workTags: { tag: Tag }[] }>(
  work: T,
): Omit<T, 'workTags'> & { tags: Tag[] } {
  const { workTags, ...rest } = work;
  return { ...rest, tags: workTags.map((member) => member.tag) };
}

@Injectable()
export class WorkService {
  constructor(private prisma: PrismaService) {}

  async createWork(data: WorkCreateDto, user: User): Promise<Work> {
    // tagIds is not a column -- it has to leave the spread below, or Prisma
    // rejects it as an unknown argument.
    const { tagIds, ...rest } = data;

    return this.prisma.$transaction(async (tx) => {
      const createdWork = await tx.work.create({
        data: {
          ...rest,
          createdBy: user.id,
          workTags: {
            create: tagIds.map((tagId) => ({
              tag: { connect: { id: tagId } },
            })),
          },
          workSizes: rest.workSizes
            ? {
                create: rest.workSizes.map((size) => ({
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
    const { tagIds, ...rest } = data;

    return this.prisma.work.update({
      where: { id },
      data: {
        ...rest,
        updatedBy: user.id,
        workSizes: {
          deleteMany: { workId: id },
          create: rest.workSizes.map((size) => ({
            size: { connect: { id: size.id } },
            quantity: size.quantity,
          })),
        },
        workTags: {
          deleteMany: { workId: id },
          create: tagIds.map((tagId) => ({
            tag: { connect: { id: tagId } },
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
        workTags: {
          include: { tag: true },
          orderBy: { tag: { name: 'asc' } },
        },
        tasks: { include: { artisan: true }, orderBy: { type: 'asc' } },
        product: {
          include: {
            productGroup: {
              include: {
                productCategory: true,
              },
            },
          },
        },
      },
    });
    if (!work) {
      throw new Error(`Work with ID ${id} not found.`);
    }
    return flattenTags(work);
  }

  async getWorks(startDate: Date, endDate: Date): Promise<WorkAndTasksDto[]> {
    const works = await this.prisma.work.findMany({
      include: {
        workSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
        workTags: {
          include: { tag: true },
          orderBy: { tag: { name: 'asc' } },
        },
        tasks: { include: { artisan: true }, orderBy: { type: 'asc' } },
        product: {
          include: {
            productGroup: {
              include: {
                productCategory: true,
              },
            },
          },
        },
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

    return works.map(flattenTags);
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
        // Order numbers typed in from the external system (plain digits)
        // share this column. Excluding them keeps the descending string
        // sort a true sequence sort, and stops generateId being handed a
        // shape it rejects.
        orderNo: { startsWith: `${Operation.Work}-` },
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
