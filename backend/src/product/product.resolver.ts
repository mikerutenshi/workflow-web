import { AuthGuard } from '@/guards/auth.guard';
import { Product } from '@/models/product.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductGetDto } from './dto/product-get.dto';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('data') data: ProductCreateDto): Promise<Product> {
    return this.productService.createProduct(data);
  }
  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: ProductCreateDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [ProductGetDto])
  getProducts(): Promise<ProductGetDto[]> {
    return this.productService.getProducts();
  }

  @Query(() => ProductGetDto)
  getProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<ProductGetDto> {
    return this.productService.getProduct(id);
  }

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<Boolean> {
    return this.productService.deleteProduct(id);
  }
}
