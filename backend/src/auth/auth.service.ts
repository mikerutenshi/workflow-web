import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/models/user.model';
import { Role } from '@/models/role.model';
import { RoleDto } from './dto/role.dto';
import { LogInDto } from './dto/logIn.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import dayjs from 'dayjs';

// const userWithRoles = Prisma.validator<Prisma.UserDefaultArgs>()({
//   include: { role: true },
// });
// type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}
  createRole(data: RoleDto): Promise<Role> {
    return this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        clearanceLevel: data.cleareanceLevel,
      },
    });
  }

  async createUser(data: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 12);

    return this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        password: password,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.roleId,
        createdBy: data.createdBy,
        approvedAt: null,
      },
      include: {
        role: true,
      },
    });
  }

  updateUser(id: number, data: UserUpdateDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data: { ...data, approvedAt: dayjs().toDate() },
      include: { role: true },
    });
  }

  getUsers(): Promise<User[]> {
    return this.prisma.user.findMany({
      include: { role: true },
    });
  }

  async logIn(data: LogInDto): Promise<{ user: User; accessToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
      include: { role: true },
    });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (isPasswordCorrect && user.isActive) {
        const accessToken = this.jwtService.sign({ sub: user.id });

        return { user, accessToken };
      } else if (!user.isActive) {
        throw new Error('User is inactive');
      } else {
        throw new Error('Incorrect password');
      }
    }

    throw new Error('User with this email not found');
  }

  async me(accessToken: string): Promise<User | null> {
    if (accessToken) {
      const data = this.jwtService.decode(accessToken, { json: true }) as {
        sub: unknown;
      };
      if (data?.sub && !isNaN(Number(data.sub))) {
        const user = await this.prisma.user.findUnique({
          where: { id: Number(data.sub) },
          include: {
            role: true,
          },
        });
        return user;
      }
    }
    return null;
  }
}
