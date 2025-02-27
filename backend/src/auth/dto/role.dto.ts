import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

@InputType()
export class RoleDto {
  @Field()
  @IsAlpha()
  name: string;
  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  description: string | null;
  @Field()
  @IsInt()
  @Min(0)
  @Max(5)
  cleareanceLevel: number;
}
