import { Role } from '@/models/role.model';
import { ParseIntPipe, UseGuards } from '@nestjs/common';
import { Args, Context, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { AuthGuard } from '../guards/auth.guard';
import { RoleGuard } from '@/guards/role.guard';
// Aliased: Role in this file is already the GraphQL object type imported above.
import { Roles } from '@/guards/roles.decorator';
import { Role as RoleLevel } from '@/models/role.enum';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { RoleDto } from './dto/role.dto';
import { UserCreateDto } from './dto/user-create.dto';
import { UserUpdateDto } from './dto/user-update.dto';
import { User } from '@/models/user.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  // Roles carry clearanceLevel, so minting one is a privilege operation.
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleLevel.Superuser)
  @Mutation(() => Role)
  createRole(@Args('data') data: RoleDto): Promise<Role> {
    return this.authService.createRole(data);
  }

  @Query(() => [Role])
  getRoles(): Promise<Role[]> {
    return this.authService.getRoles();
  }

  @Mutation(() => User)
  createUser(@Args('data') data: UserCreateDto): Promise<User> {
    return this.authService.createUser(data);
  }

  // UserUpdateDto extends PartialType(UserCreateDto), so roleId and isActive
  // are client-settable -- AuthGuard alone let any logged-in user hand
  // themselves a Superuser role. Matches the Superuser-only users setting page.
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleLevel.Superuser)
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => ID }, ParseIntPipe) id: number,
    @Args('data') data: UserUpdateDto,
  ): Promise<User> {
    return this.authService.updateUser(id, data);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Roles(RoleLevel.Superuser)
  @Query(() => [User])
  getUsers(): Promise<User[]> {
    const users = this.authService.getUsers();
    return users;
  }

  @Mutation(() => User)
  async logIn(
    @Args('data') data: LogInDto,
    @Context('req') req: Request,
  ): Promise<User> {
    const { user, accessToken } = await this.authService.logIn(data);
    req.res?.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
    return user;
  }

  @Mutation(() => User)
  async logOut(
    @Context('req') req: Request,
    @Context('user') user: User,
  ): Promise<User> {
    req.res?.clearCookie('jwt', {
      httpOnly: true,
      sameSite: 'lax',
      secure: true,
    });
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async me(@Context('user') user: User): Promise<User> {
    return user;
  }

  @Mutation(() => Boolean)
  async verifyHuman(@Args('token') token: string): Promise<boolean> {
    const result = await this.authService.verityfHuman(token);
    return result;
  }
}
