import { TaskWithArtisan } from '@/models/task-with-artisan.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { TaskUpdateDto } from './dto/task-update.dto';
import { Progress } from '@/generated/client';
import { InvProductService } from '@/inventory/invProduct.service';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private invProductService: InvProductService,
  ) {}

  updateTasks(tasks: TaskUpdateDto[]): Promise<TaskWithArtisan[]> {
    // Check if at least one task has doneAt not null, or all tasks have doneAt not null
    const hasAtLeastOneDone = tasks.some((task) => task.doneAt !== null);
    const allDone = tasks.every((task) => task.doneAt !== null);
    const allNotDone = tasks.every((task) => task.doneAt === null);

    return this.prisma.$transaction(async (prisma) => {
      // Update tasks first
      const updatedTasks = await Promise.all(
        tasks.map((task) =>
          prisma.task.update({
            where: { id: +task.id },
            data: {
              artisanId: task.artisanId !== null ? +task.artisanId : null,
              doneAt: task.doneAt,
              updatedBy: +task.updatedBy,
            },
            include: { artisan: true },
          }),
        ),
      );

      // Update work progress based on task completion status
      if (tasks.length > 0) {
        const workId = updatedTasks[0].workId;

        const initialWork = await prisma.work.findUnique({
          where: { id: workId },
          include: { product: true, workSizes: true },
        });
        const initialProgress = initialWork!.progress;

        let progress: Progress;

        if (allDone) {
          progress = Progress.COMPLETED;
        } else if (allNotDone) {
          progress = Progress.INITIATED;
        } else if (hasAtLeastOneDone) {
          progress = Progress.IN_PROGRESS;
        } else {
          progress = Progress.PENDING;
        }

        await prisma.work.update({
          where: { id: workId },
          data: { progress },
        });

        //Create new inv product if grogress == completed
        if (initialProgress !== Progress.COMPLETED && allDone) {
          const factory = await prisma.inventory.findFirst({
            where: { type: 'FACTORY' },
          });

          const invProductDto = {
            invId: factory?.id || 1,
            productId: initialWork!.productId,
            invProductSizes: initialWork!.workSizes.map((workSize) => ({
              sizeId: workSize.sizeId,
              quantity: workSize.quantity,
            })),
            sellingPrice: 0,
            discount: '0.0',
          };

          await this.invProductService.createInvProduct(invProductDto);
        }
      }

      return updatedTasks;
    });
  }

  getTasks(workId: number): Promise<TaskWithArtisan[]> {
    return this.prisma.task.findMany({
      where: { workId },
      include: { artisan: true },
      orderBy: { type: 'asc' },
    });
  }
}
