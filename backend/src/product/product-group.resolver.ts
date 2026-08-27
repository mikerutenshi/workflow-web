import { ProductGroup } from '@/models/product-group.model';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';
import { ProductGroupService } from './product-group.service';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { CsvUploadDto } from '@/file/dto/csv-upload.dto';
import { ProductGroupUpdateDto } from './dto/product-group-update.dto';
import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/guards/current-user.decorator';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { User } from '@/models/user.model';

@Resolver(() => ProductGroup)
export class ProductGroupResolver {
  constructor(private productGroupService: ProductGroupService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => ProductGroup)
  createProductGroup(
    @Args('data') data: ProductGroupCreateDto,
    @CurrentUser() user: User,
  ): Promise<ProductGroup> {
    return this.productGroupService.createProductGroup(data, user);
  }
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => ProductGroup)
  updateProductGroup(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ProductGroupUpdateDto,
    @CurrentUser() user: User,
  ): Promise<ProductGroup> {
    return this.productGroupService.updateProductGroup(id, data, user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [ProductGroupGetDto])
  getProductGroups() {
    return this.productGroupService.getProductGroups();
  }

  @UseGuards(AuthGuard)
  @Query(() => ProductGroupGetDto)
  getProductGroup(@Args('id', { type: () => ID }, ParseIntPipe) id: number) {
    return this.productGroupService.getProductGroup(id);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  deleteProductGroup(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.productGroupService.deleteProductGroup(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  downloadProductGroups(): Promise<string> {
    return this.productGroupService.downloadProductGroups();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  uploadProductGroupMsrps(
    @Args('data') data: CsvUploadDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.productGroupService.uploadProductGroupMsrps(data, user);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  uploadNewProductGroups(
    @Args('data') data: CsvUploadDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.productGroupService.uploadNewProductGroups(data, user);
  }
}
