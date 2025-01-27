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

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  approvedAt?: Date | null;

  @Field(() => Date)
  updatedAt: Date;

  @Field(() => Number, { nullable: true })
  createdBy?: number | null;

  @Field(() => Number, { nullable: true })
  approvedBy?: number | null;

  @Field(() => Role)
  role: Role;

  @Field()
  roleId: number;

  @Field(() => [User], { nullable: 'itemsAndList' })
  createdUsers?: User[] | null;

  @Field(() => [User], { nullable: 'itemsAndList' })
  approvedUsers?: User[] | null;
}
