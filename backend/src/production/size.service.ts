import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Size } from '@/models/size.model';
import { CreateSizeDto } from './dto/createSize.dto';

@Injectable()
export class SizeService {
  constructor(private prisma: PrismaService) {}

  createSize(data: CreateSizeDto): Promise<Size> {
    return this.prisma.size.create({
      data,
    });
  }

  updateSize(id: number, data: CreateSizeDto): Promise<Size> {
    return this.prisma.size.update({ where: { id }, data });
  }

  getSizes(): Promise<Size[]> {
    return this.prisma.size.findMany();
  }

  async getSize(id: number): Promise<Size> {
    const size = await this.prisma.size.findUnique({ where: { id } });

    if (!size) throw new Error(`Size with ID ${id} not found.`);
    return size;
  }

  async deleteSize(id: number): Promise<Boolean> {
    const size = this.prisma.size.delete({ where: { id } });

    if (!size) throw new Error(`Delete size with ID ${id} failed.`);
    return true;
  }
}
