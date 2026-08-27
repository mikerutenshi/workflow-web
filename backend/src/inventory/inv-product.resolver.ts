import { Resolver, Mutation, Args, Query, ID } from '@nestjs/graphql';
import { InvProductService } from './inv-product.service';
import { InvProduct } from '@/models/inv-product.model';
import { InvProductCreateDto } from './dto/inv-product-create.dto';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { InvProductUpdateDto } from './dto/inv-product-update.dto';
import { InvProductDto } from './dto/inv-product.dto';
import { CsvUploadDto } from '@/file/dto/csv-upload.dto';
import { InvProductUpdateDiscDto } from './dto/inv-product-update-disc.dto';
import { AuthGuard } from '@/guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';

@Resolver(() => InvProduct)
export class InvProductResolver {
  constructor(private service: InvProductService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => InvProduct)
  createInvProduct(
    @Args('data') data: InvProductCreateDto,
  ): Promise<InvProduct> {
    return this.service.createInvProduct(data);
  }

  @Query(() => [InvProductDto])
  getInvProducts(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
  ): Promise<InvProductDto[]> {
    return this.service.getInvProducts(invId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => InvProduct)
  updateInvProduct(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
    @Args('data') data: InvProductUpdateDto,
  ): Promise<InvProduct> {
    return this.service.updateInvProduct(invId, productId, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  deleteInvProduct(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
  ): Promise<Boolean> {
    return this.service.deleteInvProduct(invId, productId);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  uploadNewInvProducts(@Args('data') data: CsvUploadDto): Promise<boolean> {
    return this.service.uploadNewInvProducts(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  uploadInvProductDiscounts(
    @Args('data') data: CsvUploadDto,
  ): Promise<boolean> {
    return this.service.uploadInvProductDiscounts(data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => InvProduct)
  updateInvProductDisc(
    @Args('data') data: InvProductUpdateDiscDto,
  ): Promise<InvProduct> {
    return this.service.updateDiscount(data);
  }

  @Query(() => String)
  downloadInvProducts(): Promise<string> {
    return this.service.downloadInvProducts();
  }

  @Query(() => Number)
  getInvProductPrice(
    @Args('invId', { type: () => ID }, ParseIntPipe) invId: number,
    @Args('productId', { type: () => ID }, ParseIntPipe) productId: number,
    @Args('discounts', { type: () => [String] }) discounts: string[],
  ): Promise<number> {
    return this.service.computeInvProductPrice(invId, productId, discounts);
  }
}
