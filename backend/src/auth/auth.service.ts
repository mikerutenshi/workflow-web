import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from '@/models/user.model';
import { Role } from '@/models/role.model';
import { RoleDto } from './dto/role.dto';
import { LogInDto } from './dto/logIn.dto';

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
  async createRole(data: RoleDto): Promise<Role> {
    return this.prisma.role.create({
      data: {
        name: data.name,
        description: data.description,
        clearanceLevel: data.cleareanceLevel,
      },
    });
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const password = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({
      data: {
        email: data.email,
        password: password,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.roleId,
        createdBy: data.createdBy,
        approvedAt: null,
      },
      include: {
        role: true,
        // createdUsers: {
        //   select: {
        //     id: true,
        //   },
        // },
        // approvedUsers: {
        //   select: {
        //     id: true,
        //   },
        // },
      },
    });
  }

  async getUsers(): Promise<User[]> {
    return await this.prisma.user.findMany({
      include: { role: true },
    });
  }

  async logIn(data: LogInDto): Promise<{ user: User; accessToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: { role: true },
    });

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        data.password,
        user.password,
      );

      if (isPasswordCorrect) {
        const accessToken = this.jwtService.sign({ sub: user.id });

        return { user, accessToken };
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
