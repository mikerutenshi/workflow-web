import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { InventoryService } from './inventory.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Inventory } from '@/models/inventory.model';
import { InventoryCreateDto } from './dto/inventory-create.dto';
import { InventoryUpdateDto } from './dto/inventory-update.dto';
import { InventoryDto } from './dto/inventory.dto';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';

@Resolver(() => Inventory)
export class InventoryResolver {
  constructor(private service: InventoryService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => Inventory)
  createInventory(@Args('data') data: InventoryCreateDto): Promise<Inventory> {
    return this.service.createInventory(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => Boolean)
  deleteInventory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.service.deleteInventory(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Finance)
  @Mutation(() => Inventory)
  updateInventory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: InventoryUpdateDto,
  ): Promise<Inventory> {
    return this.service.updateInventory(id, data);
  }

  @UseGuards(AuthGuard)
  @Query(() => InventoryDto)
  getInventory(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<InventoryDto | null> {
    return this.service.getInventory(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => [InventoryDto])
  getInventories(): Promise<InventoryDto[]> {
    return this.service.getInventories();
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  downloadInventories(): Promise<string> {
    return this.service.downloadInventories();
  }
}
