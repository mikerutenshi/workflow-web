import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { ParseIntPipe } from '@nestjs/common';
import { Inventory } from '@/models/inventory.model';
import { InventoryCreateDto } from './dto/inventory-create.dto';
import { InventoryUpdateDto } from './dto/inventory-update.dto';
import { InventoryDto } from './dto/inventory.dto';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private service: InventoryService) {}

  @Mutation(() => Inventory)
  createInventory(@Args('data') data: InventoryCreateDto): Promise<Inventory> {
    return this.service.createInventory(data);
  }

  @Mutation(() => Boolean)
  deleteInventory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.service.deleteInventory(id);
  }

  @Mutation(() => Inventory)
  updateInventory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: InventoryUpdateDto,
  ): Promise<Inventory> {
    return this.service.updateInventory(id, data);
  }

  @Query(() => InventoryDto)
  getInventory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Inventory | null> {
    return this.service.getInventory(id);
  }

  @Query(() => [Inventory])
  getInventories(): Promise<Inventory[]> {
    return this.service.getInventories();
  }
}
