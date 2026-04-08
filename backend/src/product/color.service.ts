import { Inject, Injectable } from '@nestjs/common';
import { ColorCreateDto } from './dto/color-create.dto';
import { Color } from '@/models/color.model';
import { CustomPrismaService } from 'nestjs-prisma';
import { PrismaClient } from '@/generated/prisma/client';

@Injectable()
export class ColorService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  createColor(data: ColorCreateDto): Promise<Color> {
    return this.prisma.client.color.create({
      data: {
        name: data.name,
        hexCode: data.hexCode,
      },
    });
  }

  getColors(): Promise<Color[]> {
    return this.prisma.client.color.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getColor(id: number): Promise<Color> {
    const result = await this.prisma.client.color.findUnique({
      where: { id: id },
    });

    if (!result) throw new Error(`Product with ID ${id} not found.`);

    return result;
  }

  updateColor(id: number, data: ColorCreateDto): Promise<Color> {
    return this.prisma.client.color.update({
      where: { id: id },
      data: {
        name: data.name,
        hexCode: data.hexCode,
      },
    });
  }

  async deleteColor(id: number): Promise<Boolean> {
    const color = await this.prisma.client.color.delete({
      where: {
        id: id,
      },
    });

    if (!color) throw Error(`Delete coloor with ID ${id} failed.`);

    return true;
  }
}
