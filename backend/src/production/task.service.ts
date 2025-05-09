import { TaskWithArtisan } from '@/models/task-with-artisan.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/prisma/prisma.service';
import { TaskUpdateDto } from './dto/task-update.dto';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  updateTasks(tasks: TaskUpdateDto[]): Promise<TaskWithArtisan[]> {
    return this.prisma.$transaction(
      tasks.map((task) =>
        this.prisma.task.update({
          where: { id: +task.id },
          data: {
            artisanId: task.artisanId !== null ? +task.artisanId : null,
            doneAt: task.doneAt,
            updatedBy: +task.updatedBy,
          },
          include: { artisan: true },
        }),
      ),
    );
  }

  getTasks(workId: number): Promise<TaskWithArtisan[]> {
    return this.prisma.task.findMany({
      where: { workId },
      include: { artisan: true },
      orderBy: { type: 'asc' },
    });
  }
}
