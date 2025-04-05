import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsAlphanumeric,
  IsEmail,
  IsInt,
  IsOptional,
  IsStrongPassword,
  Min,
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
  @IsAlphanumeric()
  firstName: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsAlphanumeric()
  lastName: string | undefined;
  @Field(() => ID, { nullable: true })
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  createdBy: number | null;
  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  roleId: number;
}
