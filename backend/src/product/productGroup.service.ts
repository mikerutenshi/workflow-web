import { CsvUploadDto } from '@/file/dto/csv-upload.dto';
import { FileService } from '@/file/file.service';
import { ProductGroup } from '@/models/product-group.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import * as csv from 'fast-csv';
import { ProductGroupCreateDto } from './dto/product-group-create.dto';
import { ProductGroupGetDto } from './dto/product-group-get.dto';
import { ProductGroupUploadMsrpDto } from './dto/product-group-upload-msrp.dto';
import { ProductGroupUpdateDto } from './dto/product-group-update.dto';

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
        msrp: data.msrp,
        createdBy: data.createdBy,
      },
    });
  }

  updateProductGroup(
    id: number,
    data: ProductGroupUpdateDto,
  ): Promise<ProductGroup> {
    return this.prisma.productGroup.update({ where: { id }, data });
  }

  async getProductGroups(): Promise<ProductGroupGetDto[]> {
    return await this.prisma.productGroup.findMany({
      include: {
        productCategory: true,
      },
      orderBy: {
        skuNumeric: 'asc',
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
    const rows =
      await this.fileService.readObjects<ProductGroupUploadMsrpDto>(data);
    const validateRows = await Promise.all(
      rows.map(
        async (row) =>
          await this.fileService.validateDto(ProductGroupUploadMsrpDto, row),
      ),
    );

    await this.prisma.$transaction(
      validateRows
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
    const rows =
      await this.fileService.readObjects<ProductGroupCreateDto>(data);

    const validateRows = await Promise.all(
      rows.map(
        async (row) =>
          await this.fileService.validateDto(ProductGroupCreateDto, row),
      ),
    );

    await this.prisma.productGroup.createMany({
      data: validateRows,
      skipDuplicates: true,
    });

    return true;
  }
}
