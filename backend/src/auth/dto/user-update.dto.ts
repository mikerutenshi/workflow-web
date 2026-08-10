import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, Min } from 'class-validator';
import { UserCreateDto } from './user-create.dto';
@InputType()
export class UserUpdateDto extends PartialType(UserCreateDto) {
  @Field()
  @IsBoolean()
  isActive!: boolean;

  @Field(() => ID, { nullable: true })
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  @IsOptional()
  approvedBy?: number;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  updatedBy!: number;

  @Field(() => [ID])
  @Transform(({ value }) => value.map((member: any) => parseInt(member, 10)))
  @Min(1, { each: true })
  invIds!: number[];
}
