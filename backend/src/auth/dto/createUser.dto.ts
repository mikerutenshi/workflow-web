import { IsEmail, isNotEmpty, IsStrongPassword } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsStrongPassword()
  password: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  createdBy: number;
  @Field()
  roleId: number;
}
