import { AuthGuard } from '@/guards/auth.guard';
import { CurrentUser } from '@/guards/current-user.decorator';
import { Product } from '@/models/product.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { User } from '@/models/user.model';
import { ProductUpdateDto } from './dto/product-update.dto';
import { CsvUploadDto } from '@/file/dto/csv-upload.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Product)
  createProduct(
    @Args('data') data: ProductCreateDto,
    @CurrentUser() user: User,
  ): Promise<Product> {
    return this.productService.createProduct(data, user);
  }
  @UseGuards(RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ProductUpdateDto,
    @CurrentUser() user: User,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data, user);
  }

  @UseGuards(AuthGuard)
  @Query(() => [ProductDto])
  getProducts(): Promise<ProductDto[]> {
    return this.productService.getProducts();
  }

  @UseGuards(AuthGuard)
  @Query(() => ProductDto)
  getProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<ProductDto> {
    return this.productService.getProduct(id);
  }

  @UseGuards(RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<boolean> {
    return this.productService.deleteProduct(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => String)
  downloadProducts(): Promise<string> {
    return this.productService.downloadProducts();
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Boolean)
  uploadNewProducts(
    @Args('data') data: CsvUploadDto,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.productService.uploadNewProducts(data, user);
  }
}
