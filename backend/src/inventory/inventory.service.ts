import { Inventory } from '@/models/inventory.model';
import { InventoryCreateDto } from './dto/inventory-create.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InventoryUpdateDto } from './dto/inventory-update.dto';
import { InventoryDto } from './dto/inventory.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

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
          },
        },
      },
    });
  }

  getInventories(): Promise<Inventory[]> {
    return this.prisma.inventory.findMany();
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
            multiplier: result.priceFormula.multiplier?.toString() ?? null,
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
            },
            create: {
              multiplier: data.priceFormula?.multiplier,
              offset: data.priceFormula?.offset,
            },
          },
        },
      },
    });
  }
  async deleteInventory(id: number): Promise<Boolean> {
    const inventory = await this.prisma.inventory.delete({ where: { id } });

    if (!inventory) throw new Error(`Delete inventory with ID ${id} failed.`);

    return true;
  }
}
