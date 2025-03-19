import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateColorDto } from './dto/createColor.dto';
import { Color } from '@/models/color.model';

@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  createColor(data: CreateColorDto): Promise<Color> {
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
}
