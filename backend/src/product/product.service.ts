import { Gender } from '@/generated/prisma/enums';
import { Product } from '@/models/product.model';
import { User } from '@/models/user.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductCreateDto } from './dto/product-create.dto';
import { ProductUpdateDto } from './dto/product-update.dto';
import { ProductDto } from './dto/product.dto';
import { FileService } from '@/file/file.service';
import { CsvUploadDto } from '@/file/dto/csv-upload.dto';
import { ProductUploadDto } from './dto/product-upload.dto';

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  createProduct(data: ProductCreateDto, user: User): Promise<Product> {
    return this.prisma.$transaction(async (tx) => {
      let order = 1;

      const product = await tx.product.create({
        data: {
          sku: data.sku,
          productGroupId: data.productGroupId,
          createdBy: user.id,
          productColors: {
            create: data.colorIds.map((colorId) => ({
              color: { connect: { id: colorId } },
              order: order++,
            })),
          },
        },
      });

      // await tx.productGroup.update({
      //   where: { id: data.productGroupId },
      //   data: {
      //     msrp: data.msrp,
      //   },
      // });

      return product;
    });
  }

  updateProduct(
    id: number,
    data: ProductUpdateDto,
    user: User,
  ): Promise<Product> {
    return this.prisma.$transaction(async (tx) => {
      let order = 1;

      const product = await tx.product.update({
        where: { id },
        data: {
          sku: data.sku,
          productGroupId: data.productGroupId,
          updatedBy: user.id,
          productColors: {
            deleteMany: { productId: id },
            create: data.colorIds?.map((colorId) => ({
              color: { connect: { id: colorId } },
              order: order++,
            })),
          },
        },
      });

      // await tx.productGroup.update({
      //   where: { id: data.productGroupId },
      //   data: {
      //     msrp: data.msrp,
      //   },
      // });

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

  async deleteProduct(id: number): Promise<boolean> {
    await this.prisma.product.delete({
      where: {
        id: id,
      },
    });
    return true;
  }

  async downloadProducts(): Promise<string> {
    const products = await this.prisma.product.findMany({
      include: {
        productGroup: {
          include: {
            productCategory: true,
          },
        },
        productColors: {
          include: { color: true },
          orderBy: {
            order: 'asc',
          },
        },
      },
      where: {
        productGroup: { productCategory: { gender: Gender.MEN } },
      },
      orderBy: {
        sku: 'asc',
      },
    });

    const flatProducts = products.map((product) => ({
      id: product.id,
      sku: product.sku,
      skuRemake: `${product.sku.substring(0, product.sku.indexOf('-'))},${product.productColors.map((color) => color.color.name).join('/')}`,
      skuNumeric: product.productGroup.skuNumeric,
      gender: product.productGroup.productCategory.gender,
      msrp: product.productGroup.msrp,
    }));

    return await this.fileService.downloadObjects('products.csv', flatProducts);
  }

  async uploadNewProducts(data: CsvUploadDto, user: User): Promise<boolean> {
    const rows: ProductCreateDto[] = await this.fileService.readObjects<
      ProductUploadDto,
      ProductCreateDto
    >(data, (row) => {
      const product: ProductCreateDto = {
        sku: row.sku,
        productGroupId: row.productGroupId,
        colorIds: [],
      };
      if (row.colorId1) product.colorIds.push(row.colorId1);
      if (row.colorId2) product.colorIds.push(row.colorId2);
      if (row.colorId3) product.colorIds.push(row.colorId3);
      if (row.colorId4) product.colorIds.push(row.colorId4);

      return product;
    });

    await this.prisma.$transaction(async (tx) => {
      for (const [index, row] of rows.entries()) {
        try {
          const validatedRow = await this.fileService.validateDto(
            ProductCreateDto,
            row,
          );
          const dup = await tx.product.findUnique({
            where: { sku: validatedRow.sku },
          });
          if (!dup) {
            let order = 1;
            await tx.product.create({
              data: {
                sku: validatedRow.sku,
                productGroupId: validatedRow.productGroupId,
                createdBy: user.id,
                productColors: {
                  create: validatedRow.colorIds.map((colorId) => ({
                    color: { connect: { id: colorId } },
                    order: order++,
                  })),
                },
              },
            });
          }
        } catch (err) {
          const message =
            err instanceof Error
              ? err.message
              : typeof err === 'string'
                ? err
                : JSON.stringify(err);
          console.error(`Error processing CSV row ${index + 1}:`, {
            row,
            error: err,
          });
          throw new Error(
            `Error processing CSV row ${index + 1}: ${message ?? 'Unknown error'}`,
          );
        }
      }
    });
    return true;
  }
}
