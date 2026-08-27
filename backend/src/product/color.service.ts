import { Color } from '@/models/color.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ColorCreateDto } from './dto/color-create.dto';
import * as csv from 'fast-csv';
import { FileService } from '@/file/file.service';

@Injectable()
export class ColorService {
  constructor(
    private prisma: PrismaService,
    private fileService: FileService,
  ) {}

  createColor(data: ColorCreateDto): Promise<Color> {
    return this.prisma.color.create({
      data: {
        name: data.name,
        hexCode: data.hexCode,
      },
    });
  }

  getColors(): Promise<Color[]> {
    return this.prisma.color.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getColor(id: number): Promise<Color> {
    const result = await this.prisma.color.findUnique({
      where: { id: id },
    });

    if (!result) throw new Error(`Product with ID ${id} not found.`);

    return result;
  }

  updateColor(id: number, data: ColorCreateDto): Promise<Color> {
    return this.prisma.color.update({
      where: { id: id },
      data: {
        name: data.name,
        hexCode: data.hexCode,
      },
    });
  }

  async deleteColor(id: number): Promise<boolean> {
    const color = await this.prisma.color.delete({
      where: {
        id: id,
      },
    });

    if (!color) throw Error(`Delete coloor with ID ${id} failed.`);

    return true;
  }

  async downloadColors(): Promise<string> {
    const colors = await this.prisma.color.findMany({ orderBy: { id: 'asc' } });
    return await this.fileService.downloadObjects('colors.csv', colors);
  }
}
