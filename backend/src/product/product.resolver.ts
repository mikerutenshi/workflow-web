import { Product } from '@/models/product.model';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('data') data: ProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [Product])
  getProducts(): Promise<Product[]> {
    return this.productService.getProducts();
  }
}
