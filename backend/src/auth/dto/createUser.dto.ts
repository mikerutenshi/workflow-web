import { Field, ID, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsStrongPassword,
} from 'class-validator';

@InputType()
export class CreateUserDto {
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @IsStrongPassword()
  password: string;
  @Field()
  @IsAlpha()
  firstName: string;
  @Field()
  @IsAlpha()
  lastName: string;
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @IsNotEmpty()
  createdBy: string;
  @Field(() => ID)
  @IsNotEmpty()
  roleId: string;
}
