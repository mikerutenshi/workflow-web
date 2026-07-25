import { Inventory } from '@/models/inventory.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InventoryCreateDto } from './dto/inventory-create.dto';
import { InventoryUpdateDto } from './dto/inventory-update.dto';
import { InventoryDto } from './dto/inventory.dto';
import { FileService } from '@/file/file.service';

@Injectable()
export class InventoryService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  createInventory(data: InventoryCreateDto): Promise<Inventory> {
    return this.prisma.inventory.create({
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
    const inventories = await this.prisma.inventory.findMany({
      orderBy: { name: 'asc' },
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
    const result = await this.prisma.inventory.findUnique({
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
    return this.prisma.inventory.update({
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
    const inventory = await this.prisma.inventory.delete({
      where: { id },
    });

    if (!inventory) throw new Error(`Delete inventory with ID ${id} failed.`);

    return true;
  }

  async downloadInventories(): Promise<string> {
    const inventories = await this.prisma.inventory.findMany();
    return await this.fileService.downloadObjects(
      'inventories.csv',
      inventories,
    );
  }
}
