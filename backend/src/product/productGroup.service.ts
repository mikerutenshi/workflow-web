import { ProductGroup } from '@/models/product-group.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';
import { createWriteStream } from 'fs';
import { join } from 'path';
import { mkdir } from 'fs/promises';
import * as csv from 'fast-csv';
import { ProductGroupUploadDto } from './dto/product-group-upload.dto';
import { parse } from 'fast-csv';
import { FileUpload } from 'graphql-upload/processRequest.mjs';

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

  async exportProductGroups(): Promise<Boolean> {
    const dir = join(process.cwd(), 'tmp');
    await mkdir(dir, { recursive: true });
    const filePath = join(dir, `product-groups-${Date.now()}.csv`);

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

    return true;
  }

  async importProductGroups(data: ProductGroupUploadDto): Promise<Boolean> {
    if (!data.csvFile) {
      throw new Error('No file provided');
    }
    const { createReadStream, filename } = await data.csvFile;
    console.log(filename);
    const rows: any[] = [];

    await new Promise<void>((resolve, reject) => {
      createReadStream()
        .pipe(parse({ headers: true }))
        .on('error', reject)
        .on('data', (row) => rows.push(row))
        .on('end', () => resolve());
    });

    console.log(filename, rows);
    return true;
  }
}
