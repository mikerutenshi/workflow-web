import { Product } from '@/models/product.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductDto } from './dto/product.dto';
import * as csv from 'fast-csv';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { mkdir } from 'fs/promises';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  createProduct(data: ProductCreateDto): Promise<Product> {
    let order = 1;
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.create({
        data: {
          sku: data.sku,
          productGroupId: data.productGroupId,
          createdBy: data.createdBy,
          productColors: {
            create: data.colorIds.map((colorId) => ({
              color: { connect: { id: colorId } },
              order: order++,
            })),
          },
        },
      });

      await tx.productGroup.update({
        where: { id: data.productGroupId },
        data: {
          msrp: data.msrp,
        },
      });

      return product;
    });
  }

  updateProduct(id: number, data: ProductUpdateDto): Promise<Product> {
    let order = 1;
    return this.prisma.$transaction(async (tx) => {
      const product = await tx.product.update({
        where: { id },
        data: {
          sku: data.sku,
          productGroupId: data.productGroupId,
          productColors: {
            deleteMany: { productId: id },
            create: data.colorIds?.map((colorId) => ({
              color: { connect: { id: colorId } },
              order: order++,
            })),
          },
        },
      });

      await tx.productGroup.update({
        where: { id: data.productGroupId },
        data: {
          msrp: data.msrp,
        },
      });

      return product;
    });
  }

  async getProducts(): Promise<ProductDto[]> {
    return await this.prisma.product.findMany({
      include: {
        productGroup: {
          include: {
            productCategory: true,
          },
        },
        productColors: {
          include: {
            color: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: [{ productGroup: { skuNumeric: 'asc' } }, { sku: 'asc' }],
    });
  }

  async getProduct(id: number): Promise<ProductDto> {
    const result = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        productGroup: {
          include: {
            productCategory: true,
          },
        },
        productColors: {
          include: {
            color: true,
          },
          orderBy: {
            order: 'asc',
          },
        },
      },
    });

    if (!result) {
      throw new Error(`Product with ID ${id} not found.`);
    }
    return result;
  }

  async deleteProduct(id: number): Promise<Boolean> {
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    return true;
  }

  async downloadProducts(): Promise<string> {
    const dir = join(process.cwd(), 'public', 'downloads');
    await mkdir(dir, { recursive: true });
    const fileName = 'products.csv';
    const filePath = join(dir, fileName);

    const writableStream = createWriteStream(filePath);

    const products = await this.prisma.product.findMany();

    await new Promise<void>((resolve, reject) => {
      const csvStream = csv.format({ headers: true });
      writableStream.on('finish', resolve);
      writableStream.on('error', reject);
      csvStream.on('error', reject);
      csvStream.pipe(writableStream);

      products.forEach((item) => csvStream.write(item));
      csvStream.end();
    });

    return `/downloads/${fileName}`;
  }
}
