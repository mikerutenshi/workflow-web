import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from './role.model';

@ObjectType()
export class User {
  @Field(() => ID)
  id: number;
  @Field()
  email: string;
  @Field()
  firstName: string;
  @Field()
  lastName: string;
  @Field()
  isActive: boolean;
  @Field(() => Role)
  role: Role;

  @Field(() => Date, { nullable: true })
  approvedAt: Date | null;
  @Field(() => Number, { nullable: true })
  approvedBy: number | null;
  @Field(() => Date)
  createdAt: Date;
  @Field(() => Number, { nullable: true })
  createdBy: number | null;
  @Field(() => Date)
  updatedAt: Date;
  @Field(() => Number, { nullable: true })
  updatedBy: number | null;
  // @Field(() => [Number])
  // createdUsers: UserId[];
  // @Field()
  // approvedUsers: UserId[];
}

// @ObjectType()
// export class UserId {
//   @Field(() => ID)
//   id: number;
// }
