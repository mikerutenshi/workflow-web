import { Inject, Injectable } from '@nestjs/common';
import { Size } from '@/models/size.model';
import { SizeCreateDto } from './dto/size-create-dto.js';
import { PrismaClient } from '@/generated/prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class SizeService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  createSize(data: SizeCreateDto): Promise<Size> {
    return this.prisma.client.size.create({
      data,
    });
  }

  updateSize(id: number, data: SizeCreateDto): Promise<Size> {
    return this.prisma.client.size.update({ where: { id }, data });
  }

  getSizes(): Promise<Size[]> {
    return this.prisma.client.size.findMany({ orderBy: { eu: 'asc' } });
  }

  async getSize(id: number): Promise<Size> {
    const size = await this.prisma.client.size.findUnique({ where: { id } });

    if (!size) throw new Error(`Size with ID ${id} not found.`);
    return size;
  }

  async deleteSize(id: number): Promise<Boolean> {
    const size = this.prisma.client.size.delete({ where: { id } });

    if (!size) throw new Error(`Delete size with ID ${id} failed.`);
    return true;
  }
}
