import { Progress, TxType } from '@/generated/prisma/client';
import { InvProductService } from '@/inventory/inv-product.service';
import { InvTrfService } from '@/inventory/inv-trf.service';
import { InvTxService } from '@/inventory/inv-tx.service';
import { TaskWithArtisan } from '@/models/task-with-artisan.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TaskUpdateDto } from './dto/task-update.dto';

@Injectable()
export class TaskService {
  constructor(
    private prisma: PrismaService,
    private invProductService: InvProductService,
    private invTrfService: InvTrfService,
    private invTxService: InvTxService,
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
          include: {
            product: { include: { productGroup: true } },
            workSizes: true,
            invTrf: true,
          },
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

        const isUpdateInventory = false;

        if (isUpdateInventory) {
          const factory = await tx.inventory.findFirst({
            where: { type: 'FACTORY' },
          });

          if (!factory) throw Error('Factory is not found');

          const existingInvProduct = await tx.invToProduct.findFirst({
            where: { productId: initialWork!.productId, invId: factory.id },
            include: { invProductSizes: true },
          });

          //Create new inv product if grogress == completed
          if (initialProgress !== Progress.COMPLETED && allDone) {
            const trfNo = await this.invTrfService.generateInvTrfPrdNoOp(tx);

            const invTrfItem = await this.invTrfService.createInvTrfItem(
              {
                fromInvId: null,
                toInvId: factory.id,
                productId: initialWork!.productId,
                invTrfItemSizes: initialWork!.workSizes.map((workSize) => ({
                  sizeId: workSize.sizeId,
                  quantity: workSize.quantity,
                })),
                progress: Progress.COMPLETED,
                createdBy: userId,
              },
              tx,
            );
            const invTrf = await this.invTrfService.createInvTrf(
              {
                trfNo,
                fromInvId: null,
                toInvId: factory.id,
                progress: Progress.COMPLETED,
                invTrfItemIds: [invTrfItem.id],
                workId: initialWork!.id,
                createdBy: userId,
              },
              tx,
            );

            await this.invProductService.upsertInvProductOp(
              {
                invId: factory.id,
                productId: initialWork!.productId,
                invProductSizes: initialWork!.workSizes.map((workSize) => ({
                  sizeId: workSize.sizeId,
                  quantity: workSize.quantity,
                })),
              },
              tx,
            );

            await this.invTxService.createInvTxOp(
              {
                invId: factory.id,
                productId: initialWork!.productId,
                txNo: invTrf.trfNo,
                type: TxType.PRODUCTION,
                trfId: invTrf.id,
                createdBy: userId,
                invTxSizes: initialWork!.workSizes.map((s) => ({
                  sizeId: s.sizeId,
                  quantity: s.quantity,
                })),
              },
              tx,
            );
          } else if (initialProgress === Progress.COMPLETED && !allDone) {
            //Delete the InvTrf
            const invTrfId = initialWork!.invTrf?.id;

            if (invTrfId) {
              const invTrf = await this.invTrfService.getInvTrf(invTrfId, tx);
              await this.invTrfService.deleteInvTrf(invTrfId, tx);

              await this.invTxService.createInvTxOp(
                {
                  invId: factory.id,
                  productId: initialWork!.productId,
                  txNo: invTrf.trfNo,
                  type: TxType.REVERSION,
                  createdBy: userId,
                  invTxSizes: initialWork!.workSizes.map((s) => ({
                    sizeId: s.sizeId,
                    quantity: -s.quantity,
                  })),
                },
                tx,
              );
            }

            // Reverse the effect: subtract quantities from inventory
            if (existingInvProduct) {
              await this.invProductService.decrementInvProductOp(
                existingInvProduct.invId,
                existingInvProduct.productId,
                existingInvProduct.invProductSizes.map((size) => ({
                  sizeId: size.sizeId,
                  quantity: size.quantity,
                })),
                tx,
              );
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
