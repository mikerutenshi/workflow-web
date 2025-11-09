import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, Min } from 'class-validator';
import { UserCreateDto } from './user-create.dto';
@InputType()
export class UserUpdateDto extends PartialType(UserCreateDto) {
  @Field()
  @IsBoolean()
  isActive: boolean;

  @Field(() => ID)
  @Transform(({ value }) => parseInt(value, 10))
  @Min(1)
  approvedBy: number;
}
