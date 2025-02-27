import {
  IsAlpha,
  IsEmail,
  IsInt,
  isNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
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
  @IsAlpha()
  firstName: string;
  @Field()
  @IsAlpha()
  lastName: string;
  @Field(() => Number, { nullable: true })
  @IsOptional()
  @IsInt()
  createdBy: number;
  @Field()
  @IsInt()
  roleId: number;
}
