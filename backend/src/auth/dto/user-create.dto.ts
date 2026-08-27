import { Field, ID, InputType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsOptional,
  Matches,
  Min,
  MinLength,
} from 'class-validator';

// No createdBy: registration is unauthenticated, so the service writes null.
@InputType()
export class UserCreateDto {
  @Field()
  @IsEmail()
  email!: string;

  @Field()
  @MinLength(8)
  password!: string;

  @Field()
  @Matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
  firstName!: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @Matches(/^[A-Za-z]+(\s[A-Za-z]+)*$/)
  lastName?: string;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(1)
  roleId!: number;
}
