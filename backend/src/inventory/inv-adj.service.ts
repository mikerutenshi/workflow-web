import { Prisma, Progress, TxType } from '@/generated/prisma/client';
import { InvAdj } from '@/models/inv-adj.model';
import { Operation } from '@/models/operation.enum';
import { Role } from '@/models/role.enum';
import { User } from '@/models/user.model';
import { PrismaService } from '@/prisma/prisma.service';
import { generateId, getStartOfDay } from '@/utils/functions.util';
import { Injectable } from '@nestjs/common';
import dayjs from 'dayjs';
import { InvAdjCreateDto } from './dto/inv-adj-create.dto';
import { InvAdjItemCreateDto } from './dto/inv-adj-item-create.dto';
import { InvAdjUpdateDto } from './dto/inv-adj-update.dto';
import { InvAdjDto, InvAdjSimpleDto } from './dto/inv-adj.dto';
import { InvProductService } from './inv-product.service';
import { InvTxService } from './inv-tx.service';

@Injectable()
export class InvAdjService {
  constructor(
    private prisma: PrismaService,
    private invProductService: InvProductService,
    private invTxService: InvTxService,
  ) {}

  async generateInvAdjNo(date: Date): Promise<string> {
    const startOfDay = getStartOfDay(date);
    const oneDayMore = dayjs(startOfDay).add(1, 'day').toDate();

    const lastAdj = await this.prisma.invAdj.findFirst({
      orderBy: { adjNo: 'desc' },
      where: {
        adjDate: {
          gte: startOfDay,
          lt: oneDayMore,
        },
      },
    });

    return generateId(Operation.Adjustment, lastAdj?.adjNo, date);
  }

  /**
   * Creates the count sheet as an INITIATED draft. Deliberately has no stock
   * effect — stock only moves in postInvAdj.
   */
  async createInvAdj(data: InvAdjCreateDto, user: User): Promise<InvAdj> {
    const { invAdjItems, ...rest } = data;

    this.assertInvAllowed(rest.invId, user);

    return this.prisma.$transaction(async (tx) => {
      await this.assertProductsExist(
        invAdjItems.map((item) => item.productId),
        tx,
      );

      return tx.invAdj.create({
        data: {
          ...rest,
          createdBy: user.id,
          progress: Progress.INITIATED,
          invAdjItems: { create: this.buildItemsOp(invAdjItems) },
        },
      });
    });
  }

  async updateInvAdj(
    id: number,
    data: InvAdjUpdateDto,
    user: User,
  ): Promise<InvAdj> {
    const { invAdjItems, ...rest } = data;

    return this.prisma.$transaction(async (tx) => {
      const initial = await tx.invAdj.findUniqueOrThrow({ where: { id } });

      if (initial.progress === Progress.COMPLETED) {
        throw Error(
          `Adjustment ${initial.adjNo} has already been posted and cannot be changed. Create a new adjustment to correct it.`,
        );
      }

      this.assertOwned(initial, user);
      if (rest.invId !== undefined) this.assertInvAllowed(rest.invId, user);

      await this.assertProductsExist(
        invAdjItems.map((item) => item.productId),
        tx,
      );

      // The count sheet is a draft until posted, so items are wholly replaced.
      await tx.invAdjItem.deleteMany({ where: { invAdjId: id } });

      return tx.invAdj.update({
        where: { id },
        data: {
          ...rest,
          updatedBy: user.id,
          invAdjItems: { create: this.buildItemsOp(invAdjItems) },
        },
      });
    });
  }

  /**
   * The only path that moves stock. Applies each item's variance
   * (countedQty - systemQty) to InvProductToSize and records the signed delta
   * in the InvTx ledger as TxType.ADJUSTMENT.
   */
  async postInvAdj(id: number, updatedBy: number): Promise<InvAdj> {
    return this.prisma.$transaction(async (tx) => {
      const adj = await tx.invAdj.findUniqueOrThrow({
        where: { id },
        include: {
          invAdjItems: {
            include: {
              product: { select: { sku: true } },
              invAdjItemSizes: { include: { size: { select: { eu: true } } } },
            },
          },
        },
      });

      if (adj.progress === Progress.COMPLETED) {
        throw Error(`Adjustment ${adj.adjNo} has already been posted.`);
      }

      for (const item of adj.invAdjItems) {
        const sku = item.product.sku;

        // Guard 1: counted figures are measured against "available", which
        // excludes stock reserved by in-flight transfers. Posting while a
        // transfer is pending would apply a variance computed from a baseline
        // that does not match the shelf.
        const pendingTrfItems = await tx.invTrfItem.count({
          where: {
            fromInvId: adj.invId,
            productId: item.productId,
            progress: { not: Progress.COMPLETED },
          },
        });
        if (pendingTrfItems > 0) {
          throw Error(
            `Cannot post ${adj.adjNo}: ${sku} has ${pendingTrfItems} transfer(s) in progress. Complete or cancel them first.`,
          );
        }

        // Guard 2: refuse if stock moved while the count sheet was open.
        const deltas: { sizeId: number; delta: number }[] = [];
        for (const size of item.invAdjItemSizes) {
          const current = await tx.invProductToSize.findUnique({
            where: {
              invId_productId_sizeId: {
                invId: adj.invId,
                productId: item.productId,
                sizeId: size.sizeId,
              },
            },
          });
          const onHand = current?.quantity ?? 0;

          if (onHand !== size.systemQty) {
            throw Error(
              `Cannot post ${adj.adjNo}: stock for ${sku} size ${size.size.eu} changed during the count (expected ${size.systemQty}, found ${onHand}). Re-open the count sheet.`,
            );
          }

          const delta = size.countedQty - size.systemQty;
          if (delta !== 0) deltas.push({ sizeId: size.sizeId, delta });
        }

        if (deltas.length === 0) continue;

        // Creates the InvToProduct row when this SKU was never stocked here,
        // without disturbing an existing row's discounts.
        await this.invProductService.ensureInvProductOp(
          adj.invId,
          item.productId,
          tx,
        );

        const increments = deltas
          .filter((d) => d.delta > 0)
          .map((d) => ({ sizeId: d.sizeId, quantity: d.delta }));
        const decrements = deltas
          .filter((d) => d.delta < 0)
          .map((d) => ({ sizeId: d.sizeId, quantity: -d.delta }));

        if (increments.length > 0) {
          await this.invProductService.incrementInvProductOp(
            adj.invId,
            item.productId,
            increments,
            tx,
          );
        }
        if (decrements.length > 0) {
          await this.invProductService.decrementInvProductOp(
            adj.invId,
            item.productId,
            decrements,
            tx,
          );
        }

        await this.invTxService.createInvTxOp(
          {
            invId: adj.invId,
            productId: item.productId,
            txNo: adj.adjNo,
            type: TxType.ADJUSTMENT,
            adjId: adj.id,
            createdBy: updatedBy,
            invTxSizes: deltas.map((d) => ({
              sizeId: d.sizeId,
              quantity: d.delta,
            })),
          },
          tx,
        );
      }

      return tx.invAdj.update({
        where: { id },
        data: { progress: Progress.COMPLETED, updatedBy },
      });
    });
  }

  async deleteInvAdj(id: number, user: User): Promise<boolean> {
    const adj = await this.prisma.invAdj.findUniqueOrThrow({ where: { id } });

    if (adj.progress === Progress.COMPLETED) {
      throw Error(
        `Adjustment ${adj.adjNo} has already been posted and cannot be deleted. Create a new adjustment to correct it.`,
      );
    }

    this.assertOwned(adj, user);

    await this.prisma.invAdj.delete({ where: { id } });
    return true;
  }

  async getInvAdjs(user: User, invId?: number): Promise<InvAdjSimpleDto[]> {
    const allowed = this.allowedInvIds(user);

    // A restricted caller's own filter is intersected with what they may see,
    // so passing another warehouse's id yields nothing rather than everything.
    const invIdFilter =
      allowed === null
        ? invId !== undefined
          ? invId
          : undefined
        : {
            in:
              invId !== undefined
                ? allowed.filter((id) => id === invId)
                : allowed,
          };

    const adjs = await this.prisma.invAdj.findMany({
      where: invIdFilter !== undefined ? { invId: invIdFilter } : undefined,
      include: {
        inventory: true,
        invAdjItems: { include: { invAdjItemSizes: true } },
      },
      orderBy: { adjNo: 'desc' },
    });

    return adjs.map(({ invAdjItems, ...adj }) => ({
      ...adj,
      itemCount: invAdjItems.length,
      totalVariance: invAdjItems.reduce(
        (sum, item) =>
          sum +
          item.invAdjItemSizes.reduce(
            (s, size) => s + (size.countedQty - size.systemQty),
            0,
          ),
        0,
      ),
    }));
  }

  async getInvAdj(id: number, user: User): Promise<InvAdjDto> {
    const adj = await this.prisma.invAdj.findUniqueOrThrow({
      where: { id },
      include: {
        inventory: true,
        invAdjItems: {
          include: {
            product: true,
            invAdjItemSizes: {
              include: { size: true },
              orderBy: [{ sizeId: 'asc' }],
            },
          },
          orderBy: [
            {
              product: {
                sku: 'asc',
              },
            },
          ],
        },
      },
    });

    this.assertInvAllowed(adj.invId, user);
    return adj;
  }

  /**
   * The inventory ids this user may act on, or null when unrestricted. Planner
   * and above see every warehouse; below that, only their own assignments.
   */
  private allowedInvIds(user: User): number[] | null {
    return user.role.clearanceLevel <= Role.Planner
      ? null
      : user.userInventories.map((inv) => inv.id);
  }

  private assertInvAllowed(invId: number, user: User) {
    const allowed = this.allowedInvIds(user);
    if (allowed !== null && !allowed.includes(invId)) {
      throw Error(`You do not have access to this warehouse.`);
    }
  }

  /**
   * Below Planner, a count sheet belongs to whoever created it — one store's
   * staff must not be able to rewrite another's count.
   */
  private assertOwned(adj: { adjNo: string; createdBy: number }, user: User) {
    if (user.role.clearanceLevel > Role.Planner && adj.createdBy !== user.id) {
      throw Error(
        `Adjustment ${adj.adjNo} was created by someone else and cannot be changed by you.`,
      );
    }
  }

  private buildItemsOp(invAdjItems: InvAdjItemCreateDto[]) {
    return invAdjItems.map((item) => ({
      productId: item.productId,
      reason: item.reason,
      note: item.note,
      invAdjItemSizes: {
        create: item.invAdjItemSizes.map((size) => ({
          size: { connect: { id: size.sizeId } },
          systemQty: size.systemQty,
          countedQty: size.countedQty,
        })),
      },
    }));
  }

  private async assertProductsExist(
    productIds: number[],
    tx: Prisma.TransactionClient,
  ) {
    const unique = [...new Set(productIds)];
    const found = await tx.product.findMany({
      where: { id: { in: unique } },
      select: { id: true },
    });

    if (found.length !== unique.length) {
      const foundIds = new Set(found.map((p) => p.id));
      const missing = unique.filter((id) => !foundIds.has(id));
      throw Error(
        `Product(s) ${missing.join(', ')} do not exist in the catalog. Create them under Settings > Products first.`,
      );
    }
  }
}
