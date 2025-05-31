import { Role } from '@/models/role.model';
import { UseGuards } from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { User } from 'src/models/user.model';
import { AuthGuard } from '../guards/auth.guard';
import { AuthService } from './auth.service';
import { LogInDto } from './dto/logIn.dto';
import { RoleDto } from './dto/role.dto';
import { UserCreateDto } from './dto/user-create.dto';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Role)
  createRole(@Args('data') data: RoleDto): Promise<Role> {
    return this.authService.createRole(data);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => User)
  createUser(@Args('data') data: UserCreateDto): Promise<User> {
    return this.authService.createUser(data);
  }

  @UseGuards(AuthGuard)
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
    });
    return user;
  }

  @UseGuards(AuthGuard)
  @Query(() => User)
  async me(@Context('user') user: User): Promise<User> {
    return user;
  }
}
