import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

@InputType()
export class SignInDto {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  password: string;
}
