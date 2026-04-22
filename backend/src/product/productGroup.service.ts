import { ProductGroup } from '@/models/product-group.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import * as csv from 'fast-csv';
import { parse } from 'fast-csv';
import { CsvUploadDto } from '@/file/dto/csv-upload.dto';

@Injectable()
export class ProductGroupService {
  constructor(private prisma: PrismaService) {}

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
    const dir = join(process.cwd(), 'tmp');
    await mkdir(dir, { recursive: true });
    const fileName = 'product-groups.csv';
    const filePath = join(dir, fileName);

    const writableStream = createWriteStream(filePath);

    const groups = await this.prisma.productGroup.findMany();

    await new Promise<void>((resolve, reject) => {
      const csvStream = csv.format({ headers: true });
      writableStream.on('finish', resolve);
      writableStream.on('error', reject);
      csvStream.on('error', reject);
      csvStream.pipe(writableStream);

      groups.forEach((item) => csvStream.write(item));
      csvStream.end();
    });

    return `/downloads/${fileName}`;
  }

  async uploadProductGroupMsrps(data: CsvUploadDto): Promise<boolean> {
    if (!data.csvFile) {
      throw new Error('No file provided');
    }
    const { createReadStream, filename } = await data.csvFile;
    const rows: ProductGroup[] = [];

    await new Promise<void>((resolve, reject) => {
      createReadStream()
        .pipe(parse({ headers: true }))
        .on('error', reject)
        .on('data', (row) => rows.push(row))
        .on('end', () => resolve());
    });

    rows.map(async (row) => {
      if (row.msrp) {
        await this.prisma.productGroup.update({
          where: { id: Number(row.id) },
          data: {
            msrp: Number(row.msrp),
          },
        });
      }
    });
    return true;
  }
}
