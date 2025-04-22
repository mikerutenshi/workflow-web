import { TaskWithArtisan } from '@/models/taskWithArtisan.model';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { UpdateTaskDto } from './dto/updateTask.dto';
import { take } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  updateTasks(tasks: UpdateTaskDto[]): Promise<TaskWithArtisan[]> {
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
    });
  }
}
