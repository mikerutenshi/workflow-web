import { Tag } from '@/models/tag.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { TagCreateDto } from './dto/tag-create.dto';

@Injectable()
export class TagService {
  constructor(private prisma: PrismaService) {}

  // Archived tags are hidden from the picker, so the natural move after failing
  // to find one is to create it -- straight into the unique constraint on name.
  // Say which case it is rather than leaking a Prisma error.
  async createTag(data: TagCreateDto): Promise<Tag> {
    await this.assertNameIsFree(data.name);

    return this.prisma.tag.create({
      data: {
        name: data.name,
        archived: data.archived,
      },
    });
  }

  private async assertNameIsFree(
    name: string,
    exceptId?: number,
  ): Promise<void> {
    const clash = await this.prisma.tag.findUnique({ where: { name } });

    if (!clash || clash.id === exceptId) return;

    throw new Error(
      clash.archived
        ? `Tag "${name}" exists but is archived`
        : `Tag "${name}" already exists`,
    );
  }

  // Archived tags are returned too. They are filtered out of the picker on the
  // client, which keeps the ones already attached to the work being edited --
  // dropping them here instead would silently strip them on the next save.
  getTags(): Promise<Tag[]> {
    return this.prisma.tag.findMany({
      orderBy: { name: 'asc' },
    });
  }

  async getTag(id: number): Promise<Tag> {
    const result = await this.prisma.tag.findUnique({
      where: { id: id },
    });

    if (!result) throw new Error(`Tag with ID ${id} not found.`);

    return result;
  }

  async updateTag(id: number, data: TagCreateDto): Promise<Tag> {
    // Renaming onto a taken name trips the same constraint. Its own name is fine.
    await this.assertNameIsFree(data.name, id);

    return this.prisma.tag.update({
      where: { id: id },
      data: {
        name: data.name,
        archived: data.archived,
      },
    });
  }

  // A tag records who a past run was produced for, so one that is still attached
  // is refused rather than cascaded away. The pre-check exists to say so in words
  // the user can act on -- the bare FK violation would surface as Prisma noise,
  // and this message is also how archiving gets discovered.
  async deleteTag(id: number): Promise<boolean> {
    const inUse = await this.prisma.tagToWork.count({ where: { tagId: id } });

    if (inUse > 0)
      throw new Error(
        `Tag is used by ${inUse} work order(s) - archive it instead`,
      );

    const tag = await this.prisma.tag.delete({
      where: { id: id },
    });

    if (!tag) throw new Error(`Delete tag with ID ${id} failed.`);

    return true;
  }
}
