import { Inventory } from '@/models/inventory.model';
import { InventoryCreateDto } from './dto/inventory-create.dto';
import { Inject, Injectable } from '@nestjs/common';
import { InventoryUpdateDto } from './dto/inventory-update.dto';
import { InventoryDto } from './dto/inventory.dto';
import { PrismaClient } from '@/generated/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class InventoryService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  createInventory(data: InventoryCreateDto): Promise<Inventory> {
    return this.prisma.client.inventory.create({
      data: {
        name: data.name,
        address: data.address,
        city: data.city,
        province: data.province,
        type: data.type,
        priceFormula: {
          create: {
            multiplier: data.priceFormula.multiplier,
            offset: data.priceFormula.offset,
            discounts: data.priceFormula.discounts,
          },
        },
      },
    });
  }

  async getInventories(): Promise<InventoryDto[]> {
    const inventories = await this.prisma.client.inventory.findMany({
      orderBy: { id: 'asc' },
      include: { priceFormula: true },
    });

    return inventories.map((result) => ({
      ...result,
      priceFormula: result.priceFormula
        ? {
            ...result.priceFormula,
            multiplier: result.priceFormula.multiplier?.toFixed(2) ?? null,
            discounts: result.priceFormula.discounts.map((disc) =>
              disc.toFixed(4),
            ),
          }
        : null,
    }));
  }

  async getInventory(id: number): Promise<InventoryDto> {
    const result = await this.prisma.client.inventory.findUnique({
      where: { id },
      include: {
        priceFormula: true,
      },
    });

    if (!result) {
      throw new Error(`Inventory with ID ${id} not found.`);
    }

    return {
      ...result,
      priceFormula: result.priceFormula
        ? {
            ...result.priceFormula,
            multiplier: result.priceFormula.multiplier?.toFixed(2) ?? null,
            discounts: result.priceFormula.discounts.map((disc) =>
              disc.toFixed(4),
            ),
          }
        : null,
    };
  }

  updateInventory(id: number, data: InventoryUpdateDto): Promise<Inventory> {
    return this.prisma.client.inventory.update({
      where: { id },
      data: {
        name: data.name,
        address: data.address,
        city: data.city,
        province: data.province,
        type: data.type,
        priceFormula: {
          upsert: {
            update: {
              multiplier: data.priceFormula?.multiplier,
              offset: data.priceFormula?.offset,
              discounts: data.priceFormula?.discounts,
            },
            create: {
              multiplier: data.priceFormula?.multiplier,
              offset: data.priceFormula?.offset,
              discounts: data.priceFormula?.discounts,
            },
          },
        },
      },
    });
  }
  async deleteInventory(id: number): Promise<Boolean> {
    const inventory = await this.prisma.client.inventory.delete({
      where: { id },
    });

    if (!inventory) throw new Error(`Delete inventory with ID ${id} failed.`);

    return true;
  }
}
