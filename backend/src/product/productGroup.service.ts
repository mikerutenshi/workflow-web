import { CsvUploadDto } from '@/file/dto/csv-upload.dto';
import { FileService } from '@/file/file.service';
import { ProductGroup } from '@/models/product-group.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as csv from 'fast-csv';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';

@Injectable()
export class ProductGroupService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  async createProductGroup(data: ProductGroupCreateDto): Promise<ProductGroup> {
    return await this.prisma.productGroup.create({
      data: {
        skuNumeric: data.skuNumeric,
        productCategoryId: data.productCategoryId,
        name: data.name,
        createdBy: data.createdBy,
      },
    });
  }

  updateProductGroup(
    id: number,
    data: ProductGroupCreateDto,
  ): Promise<ProductGroup> {
    return this.prisma.productGroup.update({ where: { id }, data });
  }

  async getProductGroups(): Promise<ProductGroupGetDto[]> {
    return await this.prisma.productGroup.findMany({
      include: {
        productCategory: true,
      },
    });
  }

  async getProductGroup(id: number): Promise<ProductGroupGetDto> {
    const result = await this.prisma.productGroup.findUnique({
      where: {
        id: id,
      },
      include: {
        productCategory: true,
      },
    });

    if (!result) {
      throw new Error(`Product group with ID ${id} not found.`);
    }
    return result;
  }

  async deleteProductGroup(id: number): Promise<Boolean> {
    const productGroup = await this.prisma.productGroup.delete({
      where: { id },
    });

    if (!productGroup)
      throw Error(`Delete product group with ID ${id} failed.`);

    return true;
  }

  async downloadProductGroups(): Promise<string> {
    const groups = await this.prisma.productGroup.findMany();
    return await this.fileService.downloadObjects('product-groups.csv', groups);
  }

  async uploadProductGroupMsrps(data: CsvUploadDto): Promise<boolean> {
    if (!data.csvFile) {
      throw new Error('No file provided');
    }
    const { createReadStream, filename } = await data.csvFile;
    const rows: ProductGroup[] = [];

    await new Promise<void>((resolve, reject) => {
      createReadStream()
        .pipe(csv.parse({ headers: true }))
        .on('error', reject)
        .on('data', (row) => rows.push(row))
        .on('end', () => resolve());
    });

    await this.prisma.$transaction(
      rows
        .filter((row) => row.msrp)
        .map((row) =>
          this.prisma.productGroup.update({
            where: { id: Number(row.id) },
            data: { msrp: Number(row.msrp) },
          }),
        ),
    );

    return true;
  }

  async uploadNewProductGroups(data: CsvUploadDto): Promise<boolean> {
    if (!data.csvFile) {
      throw new Error('No file provided');
    }

    try {
      const { createReadStream, filename } = await data.csvFile;
      const rows: ProductGroupCreateDto[] = [];

      await new Promise<void>((resolve, reject) => {
        createReadStream()
          .pipe(csv.parse({ headers: true }))
          .on('error', reject)
          .on('data', (row) => {
            const createdBy = Number(row.createdBy);
            const productCategoryId = Number(row.productCategoryId);

            if (Number.isNaN(createdBy)) {
              throw new Error(`Invalid createdBy value: ${row.createdBy}`);
            }
            if (Number.isNaN(productCategoryId)) {
              throw new Error(
                `Invalid productCategoryId value: ${row.productCategoryId}`,
              );
            }
            rows.push({
              ...row,
              productCategoryId,
              createdBy,
            });
          })
          .on('end', () => resolve());
      });

      await this.prisma.productGroup.createMany({
        data: rows,
        skipDuplicates: true,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
