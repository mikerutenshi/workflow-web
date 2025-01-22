import { PrismaService } from 'nestjs-prisma';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 10);
    const defaultRole = await this.prisma.role.findFirst({
      where: { name: 'ADMIN' },
    });

    if (!defaultRole) {
      throw new Error('Required role not found');
    }
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: password,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: defaultRole.id,
        createdBy: data.createdBy,
        approvedAt: null,
      },
      include: {
        role: true,
      },
    });
  }
}
