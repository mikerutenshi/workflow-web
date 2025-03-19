import { Product } from '@/models/product.model';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@/guards/auth.guard';
import { GetProductsDto } from './dto/getProducts.dto';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('data') data: CreateProductDto): Promise<Product> {
    return this.productService.createProduct(data);
  }

  @UseGuards(AuthGuard)
  @Query(() => [GetProductsDto])
  getProducts(): Promise<GetProductsDto[]> {
    return this.productService.getProducts();
  }
}
