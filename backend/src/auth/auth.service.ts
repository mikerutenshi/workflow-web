import { Role } from '@/models/role.model';
import { User } from '@/models/user.model';
import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { LogInDto } from './dto/logIn.dto';
import { RoleDto } from './dto/role.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';

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
        clearanceLevel: data.clearanceLevel,
      },
    });
  }

  async getRoles(): Promise<Role[]> {
    let roles = await this.prisma.role.findMany();
    roles.shift();
    return roles;
  }

  async createUser(data: UserCreateDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 12);

    const result = await this.prisma.user.create({
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
        userInventories: {
          include: { inventory: true },
        },
      },
    });

    return {
      ...result,
      userInventories: result.userInventories.map((member) => member.inventory),
    };
  }

  async updateUser(id: number, data: UserUpdateDto): Promise<User> {
    return await this.prisma.$transaction(async (tx) => {
      data.invIds.map(async (invId) => {
        await tx.invToUser.create({ data: { userId: id, invId } });
      });

      const result = await this.prisma.user.update({
        where: { id },
        data: {
          email: data.email,
          roleId: data.roleId,
          isActive: data.isActive,
          approvedBy: data.approvedBy,
          approvedAt: data.isActive ? dayjs().toDate() : null,
        },
        include: {
          role: true,
          userInventories: { include: { inventory: true } },
        },
      });

      return {
        ...result,
        userInventories: result.userInventories.map(
          (member) => member.inventory,
        ),
      };
    });
  }

  async getUsers(): Promise<User[]> {
    const results = await this.prisma.user.findMany({
      include: {
        role: true,
        userInventories: { include: { inventory: true } },
      },
    });

    return results.map((result) => ({
      ...result,
      userInventories: result.userInventories.map((member) => member.inventory),
    }));
  }

  async logIn(data: LogInDto): Promise<{ user: User; accessToken: string }> {
    const result = await this.prisma.user.findUnique({
      where: { email: data.email.toLowerCase() },
      include: {
        role: true,
        userInventories: { include: { inventory: true } },
      },
    });

    if (!result) throw new Error('User with this email not found');

    const user = {
      ...result,
      userInventories: result.userInventories.map((member) => member.inventory),
    };

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
            userInventories: {
              include: {
                inventory: true,
              },
            },
          },
        });

        if (!user) throw new Error('User not found');
        return {
          ...user,
          userInventories: user.userInventories.map(
            (member) => member.inventory,
          ),
        };
      }
    }
    return null;
  }
}
