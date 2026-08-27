import { Artisan } from '@/models/artisan.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { ArtisanCreateDto } from './dto/artisan-create.dto';
import { User } from '@/models/user.model';

@Injectable()
export class ArtisanService {
  constructor(private prisma: PrismaService) {}

  async createArtisan(data: ArtisanCreateDto, user: User): Promise<Artisan> {
    return await this.prisma.artisan.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        jobs: data.jobs,
        createdBy: user.id,
      },
    });
  }

  async updateArtisan(
    id: number,
    data: ArtisanCreateDto,
    user: User,
  ): Promise<Artisan> {
    return await this.prisma.artisan.update({
      where: { id: id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        jobs: data.jobs,
        updatedBy: user.id,
      },
    });
  }

  async getArtisans(): Promise<Artisan[]> {
    return await this.prisma.artisan.findMany({
      orderBy: [{ jobs: 'asc' }, { firstName: 'asc' }],
    });
  }

  async getArtisan(id: number): Promise<Artisan> {
    const artisan = await this.prisma.artisan.findUnique({
      where: { id },
    });
    if (!artisan) throw new Error(`Artisan with ID ${id} not found.`);

    return artisan;
  }

  async deleteArtisan(id: number): Promise<boolean> {
    await this.prisma.artisan.delete({
      where: {
        id: id,
      },
    });
    return true;
  }
}
