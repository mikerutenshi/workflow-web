import { Field, ID, InputType, PartialType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { IsBoolean, Min } from 'class-validator';
import { UserCreateDto } from './user-create.dto';
// The actor is taken from the authenticated context, never from the payload,
// so a client cannot claim to have acted as someone else.
@InputType()
export class UserUpdateDto extends PartialType(UserCreateDto) {
  @Field()
  @IsBoolean()
  isActive!: boolean;

  @Field(() => [ID])
  @Transform(({ value }) => value.map((member: any) => parseInt(member, 10)))
  @Min(1, { each: true })
  invIds!: number[];
}
