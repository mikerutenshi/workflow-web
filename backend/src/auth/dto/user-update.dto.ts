import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, Min } from 'class-validator';
import { UserCreateDto } from './user-create.dto';
@InputType()
export class UserUpdateDto extends PartialType(UserCreateDto) {
  @Field()
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @IsOptional()
  approvedBy?: number;

  @Field(() => Date, { nullable: true })
  @IsOptional()
  approvedAt?: Date;

  @Field(() => ID)
  @Transform(({ value }) => value.map((member: any) => parseInt(member, 10)))
  @Min(1, { each: true })
  @IsOptional()
  invIds?: number[];
}
