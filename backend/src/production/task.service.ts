import { TaskWithArtisan } from '@/models/task-with-artisan.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { TaskUpdateDto } from './dto/task-update.dto';
import { Progress } from '@/generated/client';
import { InvProductService } from '@/inventory/inv-product.service';
import { InvTrfService } from '@/inventory/inv-trf.service';
import { generateId } from '@/utils/functions.util';
import { Operation } from '@/models/operation.enum';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private invProductService: InvProductService,
    private invTrfService: InvTrfService,
  ) {}

  updateTasks(tasks: TaskUpdateDto[]): Promise<TaskWithArtisan[]> {
    return this.prisma.$transaction(async (tx) => {
      // Update tasks first
      var userId = +tasks.at(0)!.updatedBy;
      const updatedTasks = await Promise.all(
        tasks.map((task) =>
          tx.task.update({
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

        const initialWork = await tx.work.findUnique({
          where: { id: workId },
          include: { product: true, workSizes: true },
        });
        const initialProgress = initialWork!.progress;

        let progress: Progress;

        // Check if at least one task has doneAt not null, or all tasks have doneAt not null
        const hasAtLeastOneDone = tasks.some((task) => task.doneAt !== null);
        const allDone = tasks.every((task) => task.doneAt !== null);
        const allNotDone = tasks.every((task) => task.doneAt === null);

        if (allDone) {
          progress = Progress.COMPLETED;
        } else if (allNotDone) {
          progress = Progress.INITIATED;
        } else if (hasAtLeastOneDone) {
          progress = Progress.IN_PROGRESS;
        } else {
          progress = Progress.PENDING;
        }

        await tx.work.update({
          where: { id: workId },
          data: { progress },
        });

        const factory = await tx.inventory.findFirst({
          where: { type: 'FACTORY' },
        });

        if (!factory) throw Error('Factory is not found');

        const existingInvProduct = await tx.invToProduct.findFirst({
          where: { productId: initialWork!.productId },
          include: { invProductSizes: true },
        });

        //Create new inv product if grogress == completed
        if (initialProgress !== Progress.COMPLETED && allDone) {
          const trfNo = generateId(Operation.Produce, initialWork!.orderNo);
          console.log(`trfNo: ${trfNo}`);

          const invTrfItem = await this.invTrfService.createInvTrfItem({
            fromInvId: null,
            toInvId: factory.id,
            productId: initialWork!.productId,
            invTrfItemSizes: initialWork!.workSizes.map((workSize) => ({
              sizeId: workSize.sizeId,
              quantity: workSize.quantity,
            })),
            progress: Progress.COMPLETED,
            workId: initialWork!.id,
            createdBy: userId,
          });
          await this.invTrfService.createInvTrf({
            trfNo,
            fromInvId: null,
            toInvId: factory.id,
            progress: Progress.COMPLETED,
            invTrfItemIds: [invTrfItem.id],
            createdBy: userId,
          });

          await this.invProductService.upsertInvProduct({
            invId: factory.id,
            productId: initialWork!.productId,
            invProductSizes: initialWork!.workSizes.map((workSize) => ({
              sizeId: workSize.sizeId,
              quantity: workSize.quantity,
            })),
            sellingPrice: 0,
            discount: '0.00',
          });
        } else if (initialProgress === Progress.COMPLETED && !allDone) {
          // Reverse the effect: subtract quantities from inventory
          if (existingInvProduct) {
            const { invProductSizes } = existingInvProduct;

            for (const workSize of initialWork!.workSizes) {
              const existingSize = invProductSizes.find(
                (invSize) => invSize.sizeId === workSize.sizeId,
              );

              if (existingSize) {
                const newQuantity = existingSize.quantity - workSize.quantity;

                if (newQuantity > 0) {
                  // Update existing size by subtracting quantity
                  await tx.invProductToSize.update({
                    where: {
                      invId_productId_sizeId: {
                        invId: existingInvProduct.invId,
                        productId: existingInvProduct.productId,
                        sizeId: existingSize.sizeId,
                      },
                    },
                    data: {
                      quantity: newQuantity,
                    },
                  });
                } else {
                  // Delete size entry if quantity becomes 0 or negative
                  await tx.invProductToSize.delete({
                    where: {
                      invId_productId_sizeId: {
                        invId: existingInvProduct.invId,
                        productId: existingInvProduct.productId,
                        sizeId: existingSize.sizeId,
                      },
                    },
                  });
                }
              }
            }

            // Check if all sizes have been removed and delete the invProduct if empty
            const remainingSizes = await tx.invProductToSize.findMany({
              where: {
                invId: existingInvProduct.invId,
                productId: existingInvProduct.productId,
              },
            });

            if (remainingSizes.length === 0) {
              await tx.invToProduct.delete({
                where: {
                  invId_productId: {
                    invId: existingInvProduct.invId,
                    productId: existingInvProduct.productId,
                  },
                },
              });
            }
          }
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
