import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}
}
