import { Injectable } from '@nestjs/common';
import { ProductCategory } from '@/models/product-category.model ';
import { PrismaService } from 'nestjs-prisma';
import { CreateArtisanDto } from './dto/createArtisan.dto';
import { Artisan } from '@/models/artisan.model';

@Injectable()
export class ArtisanService {
  constructor(private prisma: PrismaService) {}

  async createArtisan(data: CreateArtisanDto): Promise<Artisan> {
    return await this.prisma.artisan.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        jobs: data.jobs,
        createdBy: data.createdBy,
      },
    });
  }

  async updateArtisan(id: number, data: CreateArtisanDto): Promise<Artisan> {
    return await this.prisma.artisan.update({
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
    return await this.prisma.artisan.findMany();
  }

  async getArtisan(id: number): Promise<Artisan> {
    const artisan = await this.prisma.artisan.findUnique({ where: { id } });
    if (!artisan) throw new Error(`Artisan with ID ${id} not found.`);

    return artisan;
  }

  async deleteArtisan(id: number): Promise<Boolean> {
    await this.prisma.artisan.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
