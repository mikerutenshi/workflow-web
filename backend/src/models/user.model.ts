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
  approvedAt?: Date;
  @Field({ nullable: true })
  approvedBy?: number;
  @Field(() => Date)
  createdAt: Date;
  @Field({ nullable: true })
  createdBy?: number;
  @Field(() => Date)
  updatedAt: Date;
  @Field({ nullable: true })
  updatedBy?: number;
  @Field(() => [User])
  createdUsers: User[];
  @Field(() => [User])
  approvedUsers: User[];
}
