import { AuthGuard } from '@/guards/auth.guard';
import { Product } from '@/models/product.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductDto } from './dto/product.dto';
import { ProductService } from './product.service';
import { RoleGuard } from '@/guards/role.guard';
import { Roles } from '@/guards/roles.decorator';
import { Role } from '@/models/role.enum';
import { ProductUpdateDto } from './dto/product-update.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @UseGuards(RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Product)
  createProduct(@Args('data') data: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(data);
  }
  @UseGuards(RoleGuard)
  @Roles(Role.Planner)
  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ProductUpdateDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [ProductDto])
  getProducts(): Promise<ProductDto[]> {
    return this.productService.getProducts();
  }

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
  ): Promise<Boolean> {
    return this.productService.deleteProduct(id);
  }

  @Query(() => String)
  downloadProducts(): Promise<string> {
    return this.productService.downloadProducts();
  }
}
