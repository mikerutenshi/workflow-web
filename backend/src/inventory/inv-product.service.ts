import { CsvUploadDto } from '@/file/dto/csv-upload.dto';
import { FileService } from '@/file/file.service';
import { Gender, Prisma, Progress } from '@/generated/prisma/client';
import { InvProduct } from '@/models/inv-product.model';
import { PrismaService } from '@/prisma/prisma.service';
import { computePrice } from '@/utils/functions.util';
import { Injectable } from '@nestjs/common';
import { InvProductCreateDto } from './dto/inv-product-create.dto';
import { InvProductUpdateDiscDto } from './dto/inv-product-update-disc.dto';
import { InvProductUpdateDto } from './dto/inv-product-update.dto';
import { InvProductUploadDiscDto } from './dto/inv-product-upload-disc.dto';
import { InvProductUploadDto } from './dto/inv-product-upload.dto';
import { InvProductDto } from './dto/inv-product.dto';

@Injectable()
export class InvProductService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async createInvProduct(data: InvProductCreateDto): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;
    const invProduct = await this.prisma.invToProduct.create({
      data: {
        ...rest,
        invProductSizes: {
          create: invProductSizes,
        },
      },
      include: {
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
      },
    });

    return {
      ...invProduct,
      discounts: invProduct.discounts.map((disc) => disc.toFixed(4)),
    };
  }

  async getInvProducts(invId: number): Promise<InvProductDto[]> {
    const products = await this.prisma.invToProduct.findMany({
      include: {
        product: {
          include: {
            productGroup: { include: { productCategory: true } },
            productColors: {
              include: { color: true },
              orderBy: { order: 'asc' },
            },
          },
        },
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
        invTrfItems: {
          include: {
            invTrfItemSizes: {
              include: { size: true },
              orderBy: [{ sizeId: 'asc' }],
            },
            fromInv: true,
            toInv: true,
          },
          where: {
            progress: { not: Progress.COMPLETED },
          },
        },
        inventory: {
          include: {
            priceFormula: true,
          },
        },
      },
      where: {
        invId,
      },
      orderBy: [
        {
          product: {
            productGroup: {
              skuNumeric: 'asc',
            },
          },
        },
        {
          product: {
            sku: 'asc',
          },
        },
      ],
    });

    return products.map(({ inventory, ...product }) => {
      const pendingTrfItems = product.invTrfItems;

      return {
        ...product,
        invProductSizes: product.invProductSizes
          .map((productSize) => {
            const pendingQty = pendingTrfItems.reduce(
              (sum, i) =>
                sum +
                i.invTrfItemSizes.reduce(
                  (s, i) =>
                    i.size.id === productSize.size.id ? s + i.quantity : s,
                  0,
                ),
              0,
            );

            const finalQty = productSize.quantity - pendingQty;

            return {
              ...productSize,
              quantity: finalQty,
            };
          })
          .filter((size) => size.quantity > 0),
        discounts: product.discounts.map((disc) => disc.toFixed(4)),
        invTrfItems: product.invTrfItems.map((item) => ({
          ...item,
          discounts: item.discounts.map((disc) => disc.toFixed(4)),
        })),
        price: computePrice(
          product.product.productGroup.msrp,
          product.product.productGroup.skuNumeric,
          product.product.sku,
          product.product.productGroup.productCategoryId,
          inventory.type,
          product.discounts,
          inventory.priceFormula?.offset,
          inventory.priceFormula?.multiplier,
        ),
      };
    });
  }

  async updateInvProduct(
    invId: number,
    productId: number,
    data: InvProductUpdateDto,
  ): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;
    const invProduct = await this.prisma.invToProduct.update({
      where: { invId_productId: { invId, productId } },
      data: {
        ...rest,
        ...(invProductSizes && {
          invProductSizes: {
            deleteMany: {}, // Remove existing sizes
            create: invProductSizes, // Add new sizes
          },
        }),
      },
      include: {
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
      },
    });

    return {
      ...invProduct,
      discounts: invProduct.discounts.map((disc) => disc.toFixed(4)),
    } as InvProduct;
  }

  async updateDiscount(data: InvProductUpdateDiscDto): Promise<InvProduct> {
    const invProduct = await this.prisma.invToProduct.update({
      where: {
        invId_productId: { invId: data.invId, productId: data.productId },
      },
      data: {
        discounts: data.discounts,
      },
      include: {
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
      },
    });

    return {
      ...invProduct,
      discounts: invProduct.discounts.map((disc) => disc.toFixed(4)),
    } as InvProduct;
  }

  async upsertInvProductOp(
    data: InvProductCreateDto,
    tx: Prisma.TransactionClient,
  ): Promise<InvProduct> {
    const { invProductSizes, ...rest } = data;
    console.log(`data: ${JSON.stringify(data)}`);

    const upsertProduct = await tx.invToProduct.upsert({
      where: {
        invId_productId: { invId: data.invId, productId: data.productId },
      },
      update: rest,
      create: rest,
    });

    if (invProductSizes && invProductSizes.length > 0) {
      await this.incrementInvProductOp(
        rest.invId,
        rest.productId,
        invProductSizes,
        tx,
      );
    }

    const result = await tx.invToProduct.findUnique({
      where: {
        invId_productId: {
          invId: upsertProduct.invId,
          productId: upsertProduct.productId,
        },
      },
      include: {
        invProductSizes: {
          include: { size: true },
          orderBy: [{ sizeId: 'asc' }],
        },
      },
    });
    console.log(`result: ${JSON.stringify(result)}`);
    return {
      ...result,
      discounts: result?.discounts.map((disc) => disc.toFixed(4)),
    } as InvProduct;
  }

  decrementInvProduct(
    invId: number,
    productId: number,
    invProductSizes: {
      sizeId: number;
      quantity: number;
    }[],
  ): Promise<Boolean> {
    return this.prisma.$transaction(async (tx) => {
      await this.decrementInvProductOp(invId, productId, invProductSizes, tx);
      return true;
    });
  }

  async decrementInvProductOp(
    invId: number,
    productId: number,
    invProductSizes: {
      sizeId: number;
      quantity: number;
    }[],
    tx: Prisma.TransactionClient,
  ) {
    for (const size of invProductSizes) {
      const result = await tx.invProductToSize.update({
        where: {
          invId_productId_sizeId: {
            invId,
            productId,
            sizeId: size.sizeId,
          },
        },
        data: {
          quantity: { decrement: size.quantity },
        },
      });
      if (result.quantity === 0) {
        await tx.invProductToSize.delete({
          where: {
            invId_productId_sizeId: {
              invId,
              productId,
              sizeId: size.sizeId,
            },
          },
        });
      }
    }
  }

  async incrementInvProductOp(
    invId: number,
    productId: number,
    invProductSizes: {
      sizeId: number;
      quantity: number;
    }[],
    tx: Prisma.TransactionClient,
  ) {
    for (const size of invProductSizes) {
      await tx.invProductToSize.upsert({
        where: {
          invId_productId_sizeId: {
            invId: invId,
            productId: productId,
            sizeId: size.sizeId,
          },
        },
        update: { quantity: { increment: size.quantity } },
        create: {
          invId: invId,
          productId: productId,
          sizeId: size.sizeId,
          quantity: size.quantity,
        },
      });
    }
  }

  async deleteInvProduct(invId: number, productId: number): Promise<Boolean> {
    const invProduct = await this.prisma.invToProduct.delete({
      where: { invId_productId: { invId, productId } },
    });
    if (!invProduct) {
      throw new Error(
        `Delete invProduct with invId ${invId}, productId ${productId} failed.`,
      );
    }

    return true;
  }

  async uploadNewInvProducts(data: CsvUploadDto): Promise<boolean> {
    const sizes = await this.prisma.size.findMany({
      where: { gender: Gender.MEN },
    });

    const rows: InvProductCreateDto[] = await this.fileService.readObjects<
      InvProductUploadDto,
      InvProductCreateDto
    >(data, (row) => {
      const invProduct: InvProductCreateDto = {
        invId: row.invId,
        productId: row.productId,
        invProductSizes: [],
        discounts: [],
      };

      const nums: string[] = ['38', '39', '40', '41', '42', '43', '44', '45'];

      const requiredColumns = [
        'invId',
        'productId',
        ...nums.map((num) => `qty${num}`),
        'discounts',
      ];
      requiredColumns.forEach((column) => {
        if (!(column in row)) {
          throw new Error(
            `CSV upload missing expected column '${column}'. Please ensure headers correspond.`,
          );
        }
      });

      nums.forEach((num) => {
        const col = 'qty' + num;
        const qty = (row as any)[col];

        if (!Number.isNaN(qty) && Number(qty) > 0) {
          const size = sizes.find((size) => size.eu == num);
          if (size) {
            invProduct.invProductSizes.push({
              sizeId: size.id,
              quantity: Number(qty),
            });
          }
        }
      });

      invProduct.discounts = row.discounts
        .split(';')
        .map((disc) => disc.trim())
        .filter((disc) => disc !== '');

      return invProduct;
    });

    await this.prisma.$transaction(async (tx) => {
      for (const row of rows) {
        const validateRow = await this.fileService.validateDto(
          InvProductCreateDto,
          row,
        );

        const { invProductSizes, ...rest } = validateRow;

        await tx.invToProduct.upsert({
          where: {
            invId_productId: {
              invId: rest.invId,
              productId: rest.productId,
            },
          },
          update: {},
          create: {
            ...rest,
            invProductSizes: {
              create: invProductSizes,
            },
          },
        });
      }
    });

    return true;
  }

  async uploadInvProductDiscounts(data: CsvUploadDto): Promise<boolean> {
    const rows = await this.fileService.readObjects<
      InvProductUploadDiscDto,
      InvProductUpdateDiscDto
    >(data, (row) => {
      const discounts = row.discounts
        ? row.discounts
            .split(';')
            .map((disc) => disc.trim())
            .filter((disc) => disc !== '')
        : [];

      return {
        invId: row.invId,
        productId: row.productId,
        discounts,
      };
    });

    const validateRows = await Promise.all(
      rows.map(
        async (row) =>
          await this.fileService.validateDto(InvProductUpdateDiscDto, row),
      ),
    );

    await this.prisma.$transaction(
      validateRows.map((row) =>
        this.prisma.invToProduct.update({
          where: {
            invId_productId: { invId: row.invId, productId: row.productId },
          },
          data: { discounts: row.discounts },
        }),
      ),
    );

    return true;
  }

  async computeInvProductPrice(
    invId: number,
    productId: number,
    discounts: string[],
  ): Promise<number> {
    const priceFormula = await this.prisma.priceFormula.findUnique({
      where: { invId },
      include: { inventory: { select: { type: true } } },
    });
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
      select: {
        sku: true,
        productGroup: {
          select: { productCategoryId: true, msrp: true, skuNumeric: true },
        },
      },
    });

    if (priceFormula && product) {
      const result = computePrice(
        product.productGroup.msrp,
        product.productGroup.skuNumeric,
        product.sku,
        product.productGroup.productCategoryId,
        priceFormula.inventory.type,
        discounts.map((disc) => Prisma.Decimal(disc)),
        priceFormula.offset,
        priceFormula.multiplier,
      );

      if (!result) throw Error('Price computation failed');

      return result;
    } else {
      throw Error('Product or Inventory not found');
    }
  }
}
