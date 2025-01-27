import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { SignInDto } from './dto/signIn.dto';
import { JwtService } from '@nestjs/jwt';

const userWithRoles = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: { role: true },
});
type UserWithRoles = Prisma.UserGetPayload<typeof userWithRoles>;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createUser(data: CreateUserDto): Promise<UserWithRoles> {
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
      },
    });
  }

  async getUsers(): Promise<UserWithRoles[]> {
    const users = await this.prisma.user.findMany({
      include: { role: true },
    });
    return users;
  }

  async signIn(
    data: SignInDto,
  ): Promise<{ user: UserWithRoles; accessToken: string }> {
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
        const accessToken = this.jwtService.sign(
          { sub: user.id },
          { expiresIn: '30 days' },
        );

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
        });
        return user || null;
      }
    }
    return null;
  }
}
