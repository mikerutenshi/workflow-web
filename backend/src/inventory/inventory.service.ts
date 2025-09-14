import { Inventory } from '@/models/inventory.model';
import { InventoryCreateDto } from './dto/inventory-create.dto';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { InventoryUpdateDto } from './dto/inventory-update.dto';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  createInventory(data: InventoryCreateDto): Promise<Inventory> {
    return this.prisma.inventory.create({
      data,
    });
  }

  getInventories(): Promise<Inventory[]> {
    return this.prisma.inventory.findMany();
  }

  getInventory(id: number): Promise<Inventory | null> {
    return this.prisma.inventory.findUnique({
      where: { id },
    });
  }

  updateInventory(id: number, data: InventoryUpdateDto): Promise<Inventory> {
    return this.prisma.inventory.update({
      where: { id },
      data,
    });
  }
  async deleteInventory(id: number): Promise<Boolean> {
    const inventory = await this.prisma.inventory.delete({ where: { id } });

    if (!inventory) throw new Error(`Delete inventory with ID ${id} failed.`);

    return true;
  }
}
