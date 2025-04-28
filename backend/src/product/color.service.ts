import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ColorCreateDto } from './dto/color-create.dto';
import { Color } from '@/models/color.model';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  createColor(data: ColorCreateDto): Promise<Color> {
    return this.prisma.color.create({
      data: {
        name: data.name,
        hexCode: data.hexCode,
      },
    });
  }

  getColors(): Promise<Color[]> {
    return this.prisma.color.findMany();
  }

  async getColor(id: number): Promise<Color> {
    const result = await this.prisma.color.findUnique({ where: { id: id } });

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

  async deleteColor(id: number): Promise<Boolean> {
    const color = await this.prisma.color.delete({
      where: {
        id: id,
      },
    });

    if (!color) throw Error(`Delete coloor with ID ${id} failed.`);

    return true;
  }
}
