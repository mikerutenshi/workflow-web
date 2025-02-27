import { Query, Mutation, Resolver, Args, Context } from '@nestjs/graphql';
import { User } from 'src/models/user.model';
// import { Prisma, User as UserModel } from '@prisma/client';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';
import { SignInDto } from './dto/signIn.dto';
import { Request } from 'express';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../guards/auth.guard';
import { RoleDto } from './dto/Role.dto';
import { Role } from '@/models/role.model';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => Role)
  createRole(@Args('data') data: RoleDto): Promise<Role> {
    return this.authService.createRole(data);
  }

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserDto): Promise<User> {
    return this.authService.createUser(data);
  }

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    // type UsersWithRole = Prisma.PromiseReturnType<
    //   typeof this.authService.getUsers
    // >;
    const users = this.authService.getUsers();
    return users;
  }

  @Mutation(() => User)
  async signIn(
    @Args('data') data: SignInDto,
    @Context('req') req: Request,
  ): Promise<User> {
    const { user, accessToken } = await this.authService.signIn(data);
    req.res?.cookie('jwt', accessToken, {
      httpOnly: true,
      sameSite: 'lax',
    });
    return user;
  }

  @Mutation(() => User)
  async signOut(
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
