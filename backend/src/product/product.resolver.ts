import { AuthGuard } from '@/guards/auth.guard';
import { Product } from '@/models/product.model';
import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ID } from '@nestjs/graphql';
import { CreateProductDto } from './dto/createProduct.dto';
import { GetProductsDto } from './dto/getProducts.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';
import { ProductService } from './product.service';

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

  @Mutation(() => Boolean)
  @UseGuards(AuthGuard)
  deleteProduct(@Args('id', { type: () => ID }) id: string): Promise<Boolean> {
    return this.productService.deleteProduct(+id);
  }

  updateProduct(
    @Args('id') id: number,
    @Args('data') data: UpdateProductDto,
  ): Promise<GetProductsDto> {
    return this.productService.updateProduct(id, data);
  }
}
