import { Query, Mutation, Resolver, Args } from '@nestjs/graphql';
import { User } from 'src/models/user.model';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/createUser.dto';

@Resolver(() => User)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  createUser(@Args('data') data: CreateUserDto): Promise<User> {
    return this.authService.createUser(data);
  }

  @Query(() => [User])
  getUsers(): Promise<User[]> {
    return this.authService.getUsers();
  }
}
