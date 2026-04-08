import { Inject, Injectable } from '@nestjs/common';
import { ArtisanCreateDto } from './dto/artisan-create.dto';
import { Artisan } from '@/models/artisan.model';
import { PrismaClient } from '@/generated/prisma/client';
import { CustomPrismaService } from 'nestjs-prisma';

@Injectable()
export class ArtisanService {
  constructor(
    @Inject('PrismaService')
    private prisma: CustomPrismaService<PrismaClient>,
  ) {}

  async createArtisan(data: ArtisanCreateDto): Promise<Artisan> {
    return await this.prisma.client.artisan.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        jobs: data.jobs,
        createdBy: data.createdBy,
      },
    });
  }

  async updateArtisan(id: number, data: ArtisanCreateDto): Promise<Artisan> {
    return await this.prisma.client.artisan.update({
      where: { id: id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        jobs: data.jobs,
        createdBy: data.createdBy,
        updatedBy: data.updatedBy,
      },
    });
  }

  async getArtisans(): Promise<Artisan[]> {
    return await this.prisma.client.artisan.findMany({
      orderBy: [{ jobs: 'asc' }, { firstName: 'asc' }],
    });
  }

  async getArtisan(id: number): Promise<Artisan> {
    const artisan = await this.prisma.client.artisan.findUnique({
      where: { id },
    });
    if (!artisan) throw new Error(`Artisan with ID ${id} not found.`);

    return artisan;
  }

  async deleteArtisan(id: number): Promise<Boolean> {
    await this.prisma.client.artisan.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
