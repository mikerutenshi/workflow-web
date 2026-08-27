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
import { HttpService } from '@nestjs/axios';
import { catchError, firstValueFrom } from 'rxjs';
import { AxiosError } from 'axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private httpService: HttpService,
    private configService: ConfigService,
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
      const user = await tx.user.findUnique({ where: { id } });
      if (!user) throw Error('User not found');
      await tx.invToUser.deleteMany({ where: { userId: id } });

      for (const invId of data.invIds) {
        await tx.invToUser.create({ data: { userId: id, invId } });
      }

      const result = await this.prisma.user.update({
        where: { id },
        data: {
          email: data.email,
          roleId: data.roleId,
          isActive: data.isActive,
          approvedBy:
            !user.isActive && data.isActive ? data.approvedBy : user.approvedBy,
          approvedAt:
            !user.isActive && data.isActive
              ? dayjs().toDate()
              : user.approvedAt,
          updatedBy: data.updatedBy,
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
      orderBy: { id: 'asc' },
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
    if (!accessToken) return null;

    // verifyAsync, never decode: decode reads the payload without checking the
    // signature, so any hand-written token would authenticate as its own `sub`.
    let sub: unknown;
    try {
      ({ sub } = await this.jwtService.verifyAsync<{ sub: unknown }>(
        accessToken,
      ));
    } catch {
      // Forged, tampered with, or expired. This runs on every request via the
      // Apollo context factory, so fail to anonymous rather than throwing -- a
      // throw here would break logging in for anyone holding a stale cookie.
      return null;
    }

    if (!sub || isNaN(Number(sub))) return null;

    const user = await this.prisma.user.findUnique({
      where: { id: Number(sub) },
      include: {
        role: true,
        userInventories: {
          include: {
            inventory: true,
          },
        },
      },
    });

    // A validly signed token for a deleted user means anonymous, not an error
    // on every request the holder makes.
    if (!user) return null;

    return {
      ...user,
      userInventories: user.userInventories.map((member) => member.inventory),
    };
  }

  async verityfHuman(token: string): Promise<boolean> {
    const payload = {
      secret: this.configService.get('NUXT_TURNSTILE_SECRET_KEY'),
      response: token,
    };
    const { data } = await firstValueFrom(
      this.httpService
        .post(
          'https://challenges.cloudflare.com/turnstile/v0/siteverify',
          payload,
        )
        .pipe(
          catchError((error: AxiosError) => {
            throw error.response?.data;
          }),
        ),
    );

    if (data.success) {
      return true;
    } else {
      if (data['error-codes']) throw Error(data['error-codes']);
      else return false;
    }
  }
}
