import { AuthGuard } from '@/guards/auth.guard';
import { Product } from '@/models/product.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductsDto } from './dto/getProducts.dto';
import { ProductService } from './product.service';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }
  @Mutation(() => Product)
  updateProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: CreateProductDto,
  ): Promise<Product> {
    return this.productService.updateProduct(id, data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [GetProductsDto])
  getProducts(): Promise<GetProductsDto[]> {
    return this.productService.getProducts();
  }

  @Query(() => GetProductsDto)
  getProduct(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
  ): Promise<GetProductsDto> {
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
